import MathJax from "./mathJax";
import { getPostById, getPosts } from "../post";

export default async function Post({ params }: { params: any }) {
  const postData = await getPostById(params.id);
  return (
    <>
      <article
        className={"prose lg:prose-stone dark:prose-invert"}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <MathJax />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post }));
}
