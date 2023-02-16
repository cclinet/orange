import { PrismaClient } from "@prisma/client";
import * as process from "process";
import { extractPosts } from "./utils";

const prisma = new PrismaClient();

export async function upsertPosts() {
  console.log(`______publish______`);
  const localPosts = await extractPosts();
  for (const eachLocalPost of localPosts) {
    const unchangedPost = await prisma.post.findUnique({
      where: {
        slug: eachLocalPost.slug,
      },
    });

    if (unchangedPost && eachLocalPost.md5.equals(unchangedPost.md5)) {
      console.log("____unchanged____");
      console.log(unchangedPost);
      continue;
    }

    const post = await prisma.post.upsert({
      where: { slug: eachLocalPost.slug },
      create: {
        slug: eachLocalPost.slug,
        title: eachLocalPost.title,
        md5: eachLocalPost.md5,
        createdAt: eachLocalPost.createdAt,
        published: eachLocalPost.published,
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
        published: eachLocalPost.published,
        category: eachLocalPost.category,
        content: {
          update: {
            content: eachLocalPost.content,
          },
        },
      },
    });

    console.log("____update____");
    console.log(post);
  }

  const result = await prisma.post.updateMany({
    where: { slug: { notIn: localPosts.map((post) => post.slug) } },
    data: {
      published: false,
    },
  });

  console.log(`______not publish______`);
  console.log(result);
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
