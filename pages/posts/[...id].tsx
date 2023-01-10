import { Post, getPostIds, getPostData } from "../../utils/posts";
import Head from "next/head";
import Script from "next/script";
export default function PostPage({ postData }: { postData: any }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>

      {postData.title}
      <br />
      {postData.id}
      <br />
      <article
        className={"dark:bg-black prose lg:prose-stone dark:prose-invert"}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
      {/*TODO:修改window类型 */}
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
        onReady={() => {
          (window as any).MathJax.typeset();
        }}
      />
    </>
  );
}

export async function getStaticProps({ params }: { params: any }) {
  // Call an external API endpoint to get posts
  const postData = await getPostData(params.id);
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      postData,
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  // const posts: PostType[] = [{ title: "abc" }];
  //
  // // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: "1" },
  // }));
  const paths = getPostIds();
  console.log(paths.map((x) => x.params.id));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
