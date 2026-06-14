import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const newsDirectory = path.join(process.cwd(), "content/news");

export type NewsCategory = "event" | "speaker" | "ticket" | "general" | "recruitment";

export interface NewsFrontmatter {
  title: string;
  date: string;
  category: NewsCategory;
  published: boolean;
  externalUrl?: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  published: boolean;
  excerpt: string;
  externalUrl?: string;
}

export interface NewsDetail extends NewsItem {
  contentHtml: string;
}

const categoryLabels: Record<NewsCategory, string> = {
  event: "イベント",
  speaker: "登壇者",
  ticket: "チケット",
  general: "お知らせ",
  recruitment: "募集",
};

export function getCategoryLabel(category: NewsCategory): string {
  return categoryLabels[category] ?? "お知らせ";
}

function getSlugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

function createExcerpt(content: string): string {
  const plain = content
    .replace(/^#+\s.+/gm, "")
    .replace(/\|.*\|/g, "")
    .replace(/[-*#>|]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return plain.length > 120 ? `${plain.slice(0, 120)}…` : plain;
}

export function getAllNews(): NewsItem[] {
  if (!fs.existsSync(newsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(newsDirectory);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = getSlugFromFilename(filename);
      const filePath = path.join(newsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as NewsFrontmatter;

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        category: frontmatter.category,
        published: frontmatter.published,
        excerpt: createExcerpt(content),
        externalUrl: frontmatter.externalUrl,
      };
    })
    .filter((item) => item.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  const filePath = path.join(newsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as NewsFrontmatter;

  if (!frontmatter.published) {
    return null;
  }

  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    category: frontmatter.category,
    published: frontmatter.published,
    excerpt: createExcerpt(content),
    externalUrl: frontmatter.externalUrl,
    contentHtml: processed.toString(),
  };
}

export function getAllNewsSlugs(): string[] {
  return getAllNews().map((item) => item.slug);
}
