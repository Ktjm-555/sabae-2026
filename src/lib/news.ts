import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { withBasePath } from "@/lib/basePath";
import { newsRawFiles } from "@/lib/generated/news";

export type NewsCategory = "event" | "speaker" | "ticket" | "general" | "recruitment";

export interface NewsFrontmatter {
  title: string;
  date: string;
  category: NewsCategory;
  published: boolean;
  href?: string;
  externalUrl?: string;
  buttonLabel?: string;
  buttonHref?: string;
  priority?: number;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  published: boolean;
  excerpt: string;
  href?: string;
  externalUrl?: string;
  buttonLabel?: string;
  buttonHref?: string;
  priority?: number;
}

export function getNewsLink(news: NewsItem): { href: string; openInNewTab: boolean } {
  if (news.href) {
    return { href: news.href, openInNewTab: false };
  }

  if (news.externalUrl) {
    return { href: news.externalUrl, openInNewTab: true };
  }

  return { href: `/news/${news.slug}`, openInNewTab: false };
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
    .replace(/!\[[^\]]*]\([^)]*\)/g, "")
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
    href: frontmatter.href,
    externalUrl: frontmatter.externalUrl,
    buttonLabel: frontmatter.buttonLabel,
    buttonHref: frontmatter.buttonHref,
    priority: frontmatter.priority,
  };
}

export function getAllNews(): NewsItem[] {
  return parseNewsFiles()
    .filter((item) => item.frontmatter.published)
    .map(toNewsItem)
    .sort((a, b) => {
      const dateDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateDiff !== 0) {
        return dateDiff;
      }

      return (b.priority ?? 0) - (a.priority ?? 0);
    });
}

export async function getNewsBySlug(slug: string): Promise<NewsDetail | null> {
  const newsFile = parseNewsFiles().find((item) => item.slug === slug);

  if (!newsFile || !newsFile.frontmatter.published) {
    return null;
  }

  const processed = await remark().use(html).process(newsFile.content);
  const contentHtml = processed.toString().replace(
    /(<img\b[^>]*\ssrc=["'])(\/[^"']+)(["'])/gi,
    (_match, before: string, src: string, after: string) =>
      `${before}${withBasePath(src)}${after}`,
  );

  return {
    ...toNewsItem(newsFile),
    contentHtml,
  };
}

export function getAllNewsSlugs(): string[] {
  return getAllNews().map((item) => item.slug);
}
