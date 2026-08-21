import homeData from "../data/home.json";
import { pick, type Lang } from "../i18n/ui";

/** Locale-resolved profile data used for page titles and SEO metadata. */
export function getProfile(lang: Lang) {
  return {
    name: homeData.name,
    webpageTitle: pick(homeData.webpageTitle, lang) ?? "",
    description: pick(homeData.description, lang) ?? "",
    jobTitle: pick(homeData.jobTitle, lang) ?? "",
    keywords: pick(homeData.keywords, lang) ?? "",
    siteUrl: homeData.siteUrl,
    twitterHandle: homeData.twitterHandle,
    ogImageUrl: homeData.ogImageUrl,
    socials: homeData.socials.map((s) => ({ name: s.name, url: s.url })),
  };
}
