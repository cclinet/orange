import Index from "./index";
import { getPostsByCaterory } from "../../prisma/utils";

export default async function Page() {
  const posts = await getPostsByCaterory("post");
  return <Index allPostsData={posts} root={"/"}></Index>;
}
