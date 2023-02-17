import MathJaxScript from "./mathJax-script";
import { mdToHtml } from "./utils";
import {
  getAllPublishPost,
  getPostBySlug,
  getPostTitleBySlug,
} from "../../../prisma/utils";
import { notFound } from "next/navigation";
import Footer from "./footer";
import "@highlightjs/cdn-assets/styles/androidstudio.min.css";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const title = await getPostTitleBySlug(params.slug.at(-1)!);
  return { title: title, authors: { name: "cclin" } };
}

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
        <Footer />
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
