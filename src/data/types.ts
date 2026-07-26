export interface LocalizedText {
  zh: string | null;
  en: string | null;
}

export interface ProjectLinks {
  demo?: string;
  docs?: string;
}

export interface Project {
  name: string;
  order: number;
  featured: boolean;
  title: LocalizedText;
  description: LocalizedText;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
  accent: string | null;
  screenshot: string | null;
  links: ProjectLinks;
}

export interface ProjectsData {
  generatedAt: string;
  projects: Project[];
}
