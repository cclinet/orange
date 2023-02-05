import Index from "./index";
import { getPostsByCategory } from "../../prisma/utils";

export default async function Page() {
  const posts = await getPostsByCategory("post", false);
  return <Index allPostsData={posts} root={"/"}></Index>;
}
