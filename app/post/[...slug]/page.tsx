import MathJaxScript from "./mathJax-script";
import { mdToHtml } from "../post_utils";
import { getAllPublishPost, getPostBySlug } from "../../../prisma/utils";
export const revalidate = 3600; // revalidate every hour

export default async function Post({ params }: { params: any }) {
  const md = await getPostBySlug(params.slug.at(-1));
  // const postData = await getPostById(params.id);
  if (md) {
    const contentHtml = await mdToHtml(md);

    // await upsertPosts();
    return (
      <>
        <article
          className={"prose mt-16 lg:prose-stone dark:prose-invert"}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <MathJaxScript />
      </>
    );
  } else {
  }
}

export async function generateStaticParams() {
  const posts = await getAllPublishPost();
  return posts.map((post) => ({ slug: post }));
}
