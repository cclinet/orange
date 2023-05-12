import { createHash } from "crypto";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { PrismaClient } from "@prisma/client";
import * as process from "process";

const prisma = new PrismaClient();
const postsDirectory = path.join(process.cwd(), "posts");

export async function getFileMd5(fileContents: string) {
  const hash = createHash("md5");
  hash.update(fileContents);
  return hash.digest();
}

export async function getLocalPosts() {
  let posts = [];
  const allFiles = await fs.readdir(postsDirectory);
  for (const eachFile of allFiles) {
    const slug = eachFile.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, eachFile);
    const fileContent: string = await fs.readFile(fullPath, {
      encoding: "utf-8",
    });
    const { content, data } = matter(fileContent);

    const post = {
      slug,
      title: data.title,
      createdAt: new Date(data.date),
      published: data.published,
      content,
    };
    // console.log(post);
    posts.push(post);
  }
  return posts;
}

export async function getPostBySlug(
  slug: string
): Promise<string | null | undefined> {
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

export async function getPostTitleBySlug(
  slug: string
): Promise<string | null | undefined> {
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

export async function getPosts(
  published: boolean = true
): Promise<{ title: string; slug: string; createdAt: Date }[]> {
  let query;
  if (published) {
    query = { published: true };
  } else {
    query = {};
  }
  try {
    return await prisma.post.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
      select: { title: true, createdAt: true, slug: true },
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}
