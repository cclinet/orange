import { useRouter } from "next/router";

type PostType = {
  title: String;
};

export default function Post(props: { posts: PostType[] }) {
  const router = useRouter();
  console.log(props);
  props.posts?.map((post, i) => {
    console.log(post);
  });

  return (
    <div>abc</div>
    // <ul>
    //     {posts.map((post, i) => (
    //         <li key={i}>{post.title}</li>
    //     ))}
    // </ul>
  );
}

export async function getStaticProps(params: any) {
  // Call an external API endpoint to get posts
  const posts: PostType[] = [{ title: "S" }, { title: "abc" }];

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const posts: PostType[] = [{ title: "abc" }];

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { id: "1" },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
