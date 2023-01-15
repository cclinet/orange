import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { Category, PrismaClient } from "@prisma/client";
import * as process from "process";

const prisma = new PrismaClient();
const postsDirectory = path.join(process.cwd(), "posts");

interface Post {
  id?: number;
  slug: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  md5: Buffer;
  published?: boolean;
  category: Category;
}

function getCategoryReverse(category: string) {
  if (category.toUpperCase() === "POST") {
    return Category.POST;
  } else if (category.toUpperCase() === "JOURNAL") {
    return Category.JOURNAL;
  } else {
    process.exit(1);
  }
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

export async function extractPosts() {
  let posts: Post[] = [];
  const allFiles = await getAllFilePath();
  for (const eachFile of allFiles) {
    const [tmpCategory, tmpSlug] = eachFile.split(path.sep);
    const [category, fileName] = tmpSlug
      ? [tmpCategory, tmpSlug]
      : ["post", tmpCategory];
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, eachFile);
    const fileContent: string = await fs.readFile(fullPath, {
      encoding: "utf-8",
    });
    const { content, data } = matter(fileContent);
    //TODO
    const title: string = data.title;
    const date: Date = new Date(data.date);
    const md5 = await getFileMd5(fileContent);
    const cat = getCategoryReverse(category);

    const post: Post = {
      slug,
      title,
      content,
      createdAt: date,
      md5,
      category: cat,
    };
    // console.log(post);
    posts.push(post);
  }
  return posts;
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      select: { content: { select: { content: true } } },
    });
    return post?.content?.content;
  } catch (error) {
    return null;
  }
}

export async function getPostTitleBySlug(slug: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      select: { title: true },
    });
    return post?.title;
  } catch (error) {
    return null;
  }
}

export async function getAllPublishPost(published: boolean = true) {
  try {
    const posts = await prisma.post.findMany({
      where: { published: published },
      select: { category: true, slug: true },
    });
    return posts.map(({ category, slug }) => {
      if (category === Category.POST) {
        return [slug];
      } else {
        return [category, slug];
      }
    });
  } catch (error) {
    return [];
  }
}

export async function getPostsByCategory(category: string) {
  try {
    return await prisma.post.findMany({
      where: { category: getCategoryReverse(category) },
      orderBy: { createdAt: "desc" },
      select: { title: true, createdAt: true, slug: true },
    });
  } catch (error) {
    return [];
  }
}
