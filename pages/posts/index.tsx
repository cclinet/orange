import { getSortedPostsData, Post } from "../../utils/posts";
import Link from "next/link";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData("/");
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
        <ul className={`flex flex-col gap-y-16`}>
          {allPostsData.map(({ id, timestamp, title }, index) => (
            <li key={index}>
              <Link
                href={`/posts/${id}`}
                className={`flex flex-row justify-between`}
              >
                <span>{title}</span>
                <hr
                  className={`grow self-end border-dotted border-slate-500 mb-2 mx-2`}
                />
                <span>{new Date(timestamp).getDate()}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
