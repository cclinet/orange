import Index from "../index";
import { getPostsByCategory } from "../../../prisma/utils";

export default async function Page() {
  const posts = await getPostsByCategory("journal");
  return <Index allPostsData={posts} root={"/journal"}></Index>;
}
