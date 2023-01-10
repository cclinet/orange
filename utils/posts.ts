import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkRehype from "remark-rehype";
import remarkMath from "remark-math";
import rehypeStringify from "rehype-stringify";
import rehypeMathjaxBrowser from "rehype-mathjax/browser.js";

const postsDirectory = path.join(process.cwd(), "posts");
export interface Post {
  timestamp: number;
  id: string;
  title: string;
}

function getAbsolutePaths() {
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
export function getPostIds() {
  const fileNames = getAbsolutePaths();
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName,
      },
    };
  });
}
export async function getPostData(id: string[]) {
  const relativePath = id.join("/") + ".md";
  const fullPath = path.join(postsDirectory, relativePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeMathjaxBrowser)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getSortedPostsData(subDirectory: string): Post[] {
  // Get file names under /posts
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
      const date: Date = new Date(matterResult.data.date);
      const title: string = matterResult.data.title;
      const timestamp: number = date.getTime();
      // Combine the data with the id
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
