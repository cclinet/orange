import { getSortedPostsData, Post } from "../../utils/posts";
import Link from "next/link";
import Index from "../../components";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData("/");
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: { allPostsData: Post[] }) {
  return <Index allPostsData={allPostsData} root={"/"}></Index>;
}
