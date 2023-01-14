import MathJaxScript from "./mathJax-script";
import { getPostById, getPosts } from "../post_utils";
import { upsertAllPosts } from "../../../prisma/utils";
export const revalidate = 3600; // revalidate every hour

export default async function Post({ params }: { params: any }) {
  const postData = await getPostById(params.id);
  console.log(await upsertAllPosts());
  return (
    <>
      <article
        className={"prose mt-16 lg:prose-stone dark:prose-invert"}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      <MathJaxScript />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ id: post }));
}
