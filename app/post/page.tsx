import { getSortedPostsData } from "./post";
import Index from "./index";

export default async function Page() {
  const posts = await getSortedPostsData("/");
  return <Index allPostsData={posts} root={"/"}></Index>;
}
