import Link from "next/link";
import { Post } from "../utils/posts";

function TimestampToString(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}
export default function Index({ allPostsData }: { allPostsData: Post[] }) {
  return (
    <div>
      <ul className={`flex flex-col gap-y-12`}>
        {allPostsData.map(({ id, timestamp, title }, index) => (
          <li key={index}>
            <Link
              href={`/posts/${id}`}
              className={`flex flex-row justify-between text-gray-700 hover:text-black`}
            >
              <span className={`text-lg`}>
                {title}
              </span>
              <hr
                className={`grow self-end border-dotted border-slate-500 mb-2 mx-2 hover:border-slate-800`}
              />
              <span className={`text-base`}>
                {TimestampToString(timestamp)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
