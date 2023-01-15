import { PrismaClient } from "@prisma/client";
import * as process from "process";
import { extractPosts } from "./utils";

const prisma = new PrismaClient();

export async function upsertPosts() {
  const localPosts = await extractPosts();
  for (const eachLocalPost of localPosts) {
    const post = await prisma.post.upsert({
      where: { slug: eachLocalPost.slug },
      create: {
        slug: eachLocalPost.slug,
        title: eachLocalPost.title,
        md5: eachLocalPost.md5,
        category: eachLocalPost.category,
        content: {
          create: {
            content: eachLocalPost.content,
          },
        },
      },
      update: {
        slug: eachLocalPost.slug,
        title: eachLocalPost.title,
        md5: eachLocalPost.md5,
        createdAt: eachLocalPost.createdAt,
        category: eachLocalPost.category,
        content: {
          update: {
            content: eachLocalPost.content,
          },
        },
      },
    });
    console.log(post);
  }
}

upsertPosts()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
