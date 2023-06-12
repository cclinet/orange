import Index from "./index";
import { getPosts } from "../../../prisma/utils";

export const revalidate = 86400;

export default async function Page() {
  const posts = await getPosts();
  return <Index allPostsData={posts} root={""}></Index>;
}
