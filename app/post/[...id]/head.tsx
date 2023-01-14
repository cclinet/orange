import { getPostById } from "../post_utils";
export default async function Head({ params }: { params: any }) {
  const postData = await getPostById(params.id);

  return (
    <>
      <title key="title">{postData.title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/androidstudio.min.css"
        // @ts-ignore
        precedence="default"
      />
    </>
  );
}
