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
        <ul>
          {allPostsData.map(({ id, timestamp, title }, index) => (
            <li key={index}>
              <Link href={`/posts/journal/${id}`}>
                <span>{title}</span>
                <span>{timestamp}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
