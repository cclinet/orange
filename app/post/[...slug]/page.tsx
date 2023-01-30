import MathJaxScript from "./mathJax-script";
import { mdToHtml } from "../post_utils";
import { getAllPublishPost, getPostBySlug } from "../../../prisma/utils";
import { notFound } from "next/navigation";
import Footer from "./footer";

export default async function Post({ params }: { params: { slug: string[] } }) {
  const md = await getPostBySlug(params.slug.at(-1)!);
  if (md) {
    const contentHtml = await mdToHtml(md);
    return (
      <>
        <article
          className={"prose mt-16 dark:prose-invert prose-blockquote:text-sm"}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        <Footer/>
        <MathJaxScript />
      </>
    );
  } else {
    notFound();
  }
}

export async function generateStaticParams() {
  const posts = await getAllPublishPost();
  return posts.map((post) => ({ slug: post }));
}
