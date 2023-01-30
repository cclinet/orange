import Link from "next/link";

function DateToString(date: Date) {
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
  allPostsData: { title: string; createdAt: Date; slug: string }[];
  root: string;
}) {
  return (
    <ul className={`flex flex-col gap-y-10 mt-32 font-serif`}>
      {allPostsData.map(({ title, createdAt, slug }, index) => (
        <li key={index}>
          <Link
            href={`/post${root}/${slug}`}
            className={`flex flex-row justify-between text-black  hover:text-gray-700/75`}
          >
            <span className={`text-lg`}>{title}</span>
            <hr
              className={`grow self-end border-dotted mb-2 mx-2 border-slate-800 hover:border-slate-500`}
            />
            <span className={`text-base`}>{DateToString(createdAt)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
