import { getPostById } from "../post";
export default async function Head({ params }: { params: any }) {
  const postData = await getPostById(params.id);
  return (
    <>
      <title key="title">{postData.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}