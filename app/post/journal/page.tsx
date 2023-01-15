import Index from "../index";
import { getPostsByCaterory } from "../../../prisma/utils";

export default async function Page() {
  const posts = await getPostsByCaterory("journal");
  return <Index allPostsData={posts} root={"/journal"}></Index>;
}
