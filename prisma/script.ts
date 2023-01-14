import { PrismaClient } from "@prisma/client";
import * as process from "process";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.post.create({
  //   data: {
  //     name: "Alice",
  //     email: "alice@prisma.io",
  //   },
  // });
  // console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
