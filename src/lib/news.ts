import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { newsRawFiles } from "@/lib/generated/news";

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

interface ParsedNewsFile {
  slug: string;
  frontmatter: NewsFrontmatter;
  content: string;
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

function parseNewsFiles(): ParsedNewsFile[] {
  return Object.entries(newsRawFiles).map(([slug, rawContent]) => {
    const { data, content } = matter(rawContent);

    return {
      slug,
      frontmatter: data as NewsFrontmatter,
      content,
    };
  });
}

function toNewsItem({ slug, frontmatter, content }: ParsedNewsFile): NewsItem {
  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    category: frontmatter.category,
    published: frontmatter.published,
    excerpt: createExcerpt(content),
    externalUrl: frontmatter.externalUrl,
  };
}

export function getAllNews(): NewsItem[] {
  return parseNewsFiles()
    .filter((item) => item.frontmatter.published)
    .map(toNewsItem)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  const newsFile = parseNewsFiles().find((item) => item.slug === slug);

  if (!newsFile || !newsFile.frontmatter.published) {
    return null;
  }

  const processed = await remark().use(html).process(newsFile.content);

  return {
    ...toNewsItem(newsFile),
    contentHtml: processed.toString(),
  };
}

export function getAllNewsSlugs(): string[] {
  return getAllNews().map((item) => item.slug);
}
