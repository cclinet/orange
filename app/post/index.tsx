import Link from "next/link";
import { Post_utils } from "./post_utils";

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
  allPostsData: Post_utils[];
  root: string;
}) {
  return (
    <ul className={`flex flex-col gap-y-10 mt-32 font-xiaowei`}>
      {allPostsData.map(({ id, timestamp, title }, index) => (
        <li key={index}>
          <Link
            href={`/post${root}/${id}`}
            className={`flex flex-row justify-between text-black  hover:text-gray-700/75`}
          >
            <span className={`text-lg`}>{title}</span>
            <hr
              className={`grow self-end border-dotted mb-2 mx-2 border-slate-800 hover:border-slate-500`}
            />
            <span className={`text-base`}>{TimestampToString(timestamp)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
