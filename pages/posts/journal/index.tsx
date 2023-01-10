import { getSortedPostsData, Post } from "../../../utils/posts";
import Link from "next/link";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData("/journal");
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }: { allPostsData: Post[] }) {
  return (
    <div>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2> Blog</h2>
        <ul>
          {allPostsData.map(({ id, timestamp, title }, index) => (
            <li key={index}>
              <Link href={`/posts/journal/${id}`}>
                {title}
                {id}
                {timestamp}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
