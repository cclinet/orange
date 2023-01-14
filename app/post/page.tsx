import { getSortedPostsData } from "./post_utils";
import Index from "./index";

export default async function Page() {
  const posts = await getSortedPostsData("/");
  return <Index allPostsData={posts} root={"/"}></Index>;
}
