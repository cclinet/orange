import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Category } from "@prisma/client";
import * as process from "process";

const postsDirectory = path.join(process.cwd(), "posts");
interface Post {
  id?: number;
  slug: string;
  title: string;
  content: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  md5: Buffer;
  published?: boolean;
  category: Category;
}
export async function getAllFilePath() {
  let paths: string[] = [];

  await recursive("");
  async function recursive(relativePath: string) {
    const curPath = path.join(postsDirectory, relativePath);
    const fileNames = await fs.readdir(curPath);
    for (const fileName of fileNames) {
      const newRelativePath: string = path.join(relativePath, fileName);
      const fullPathString = path.join(postsDirectory, newRelativePath);
      if ((await fs.lstat(fullPathString)).isDirectory()) {
        await recursive(newRelativePath);
      } else {
        paths.push(newRelativePath);
      }
    }
  }
  return paths;
}

export async function getFileMd5(fileContents: string) {
  const hash = createHash("md5");
  hash.update(fileContents);
  return hash.digest();
}

export async function upsertAllPosts() {
  let posts: Post[] = [];
  const allFiles = await getAllFilePath();
  for (const eachFile of allFiles) {
    const [tmpCategory, tmpSlug] = eachFile.split(path.sep);
    const [category, slug] = tmpSlug
      ? [tmpCategory, tmpSlug]
      : ["post", tmpCategory];
    const fullPath = path.join(postsDirectory, eachFile);
    const fileContent: string = await fs.readFile(fullPath, {
      encoding: "utf-8",
    });
    const { content, data } = matter(fileContent);
    //TODO
    const title: string = data.title;
    const md5 = await getFileMd5(fileContent);
    let cat;
    if (category.toUpperCase() === "POST") {
      cat = Category.POST;
    } else if (category.toUpperCase() === "JOURNAL") {
      cat = Category.JOURNAL;
    } else {
      process.exit(1);
    }
    const post = {
      slug,
      title,
      content,
      md5,
      category: cat,
    };
    console.log(post);
    posts.concat(post);
  }
  return posts;
}
