import projectsData from "../data/projects.json";
import type { Lang } from "../i18n/ui";

/** A value that is either the same in every language, or given per locale. */
export type L<T> = T | Record<Lang, T>;

export interface ProjectSection {
  heading: L<string>;
  body?: L<string[]>;
  list?: L<string[]>;
}

export interface Project {
  slug: string;
  /** Product names are not translated. */
  title: string;
  tagline?: L<string>;
  description: L<string>;
  /** Internal key — drives the badge colour. Never displayed. */
  category: string;
  categoryLabel: L<string>;
  period?: L<string>;
  role?: L<string>;
  tech: string[];
  platforms: string[];
  link?: string;
  repoUrl?: string;
  /** Filename inside src/assets/projects/<slug>/ to use as the card cover. Defaults to the first screenshot. */
  cover?: string;
  sections?: ProjectSection[];
  /** Screenshot filename -> caption, used as the alt text and shown in the lightbox. */
  captions?: Record<string, L<string>>;
}

/** Single entry point for project data, in the order they appear on the page. */
export function getProjects(): Project[] {
  return projectsData as unknown as Project[];
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}
