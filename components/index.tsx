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
export default function Index({
  allPostsData,
  root,
}: {
  allPostsData: Post[];
  root: string;
}) {
  return (
    <div>
      <ul className={`flex flex-col gap-y-10`}>
        {allPostsData.map(({ id, timestamp, title }, index) => (
          <li key={index}>
            <Link
              href={`/posts${root}/${id}`}
              className={`flex flex-row justify-between text-black  hover:text-gray-700`}
            >
              <span className={`text-lg`}>{title}</span>
              <hr
                className={`grow self-end border-dotted mb-2 mx-2 border-slate-800 hover:border-slate-500`}
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
