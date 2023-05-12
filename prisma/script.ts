import { PrismaClient } from "@prisma/client";
import * as process from "process";
import { getLocalPosts } from "./utils";

const prisma = new PrismaClient();

export async function upsertPosts() {
  console.log(`______publish______`);
  const localPosts = await getLocalPosts();
  for (const { content, ...metadata } of localPosts) {
    const post = await prisma.post.upsert({
      where: { slug: metadata.slug },
      create: { ...metadata, content: { create: { content } } },
      update: { ...metadata, content: { update: { content } } },
      include: {
        content: true,
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
