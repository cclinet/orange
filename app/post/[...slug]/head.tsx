import { getPostTitleBySlug } from "../../../prisma/utils";
export default async function Head({ params }: { params: any }) {
  const postData = await getPostTitleBySlug(params.slug.at(-1));

  return (
    <>
      <title key="title">{postData}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/androidstudio.min.css"
        // @ts-ignore
        precedence="default"
      />
    </>
  );
}
