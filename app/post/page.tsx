import Index from "./index";
import { getPostsByCategory } from "../../prisma/utils";

export default async function Page() {
  const posts = await getPostsByCategory("post", true);
  return <Index allPostsData={posts} root={""}></Index>;
}
