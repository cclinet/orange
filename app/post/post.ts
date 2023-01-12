import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeMathjaxBrowser from "rehype-mathjax/browser";
import rehypeStringify from "rehype-stringify";

export interface Post{
  id:string
  title:string
  timestamp:number
  content?: string
}

const postsDirectory = path.join(process.cwd(), "posts");


export async function getPosts() {
  let paths: string[][] = [];

  recursive([]);
  function recursive(relativePath: string[]) {
    const fileNames = fs.readdirSync(
      path.join(postsDirectory, ...relativePath)
    );
    for (const fileName of fileNames) {
      const newRelativePath: string[] = relativePath.concat(fileName);
      const fullPathString = path.join(postsDirectory, ...newRelativePath);
      if (fs.lstatSync(fullPathString).isDirectory()) {
        recursive(newRelativePath);
      } else {
        paths.push(relativePath.concat(fileName.replace(/\.md$/, "")));
      }
    }
  }
  return paths;
}

export async function getSortedPostsData(subDirectory: string) {
  const directory = path.join(postsDirectory, subDirectory);
  const fileNames = fs.readdirSync(directory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      const timestamp: number = new Date(matterResult.data.date).getTime();
      const title: string = matterResult.data.title;
      return {
        id,
        timestamp,
        title,
      };
    });
  // Sort posts by date
  return allPostsData.sort((a: Post, b: Post) => {
    if (a.timestamp < b.timestamp) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostById(id:string[]) {
  const relativePath = id.join("/") + ".md";
  const fullPath = path.join(postsDirectory, relativePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjaxBrowser)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  const title = matterResult.data.title;
  return {
    id,
    contentHtml,
    title,
  };
}