import { Post, getAllPostIds, getPostData } from "../../utils/posts";

export default function PostPage({ postData }:{postData: Post}) {

  return (
    <>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.timestamp}
    </>
  );
}

export async function getStaticProps({ params }: {params: any }) {
  // Call an external API endpoint to get posts
  const postData = getPostData(params.id);
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
  const paths = getAllPostIds();
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
