import siteConfig from "../../content/site.json";

export type SiteConfig = typeof siteConfig;

export function getSiteConfig(): SiteConfig {
  return siteConfig;
}
