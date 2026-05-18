export type Tag = "Backend" | "API" | "Database" | "DevOps" | "Frontend";
export type StatusTone = "success" | "warning" | "primary";
export type BadgeTone = StatusTone | "neutral";

export type Project = {
  name: string;
  tag: Tag;
  status: StatusTone;
  statusLabel: string;
  description: string;
  stack: string[];
  cover: string;
  gallery: string[];
};

export type SkillItem = { icon: string; label: string; tag: Tag | "All" };
export type Experience = { role: string; company: string; period: string };
export type AboutTag = { label: string; tone: BadgeTone };

export type PortfolioData = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  hero: {
    kicker: string;
    firstName: string;
    lastName: string;
    tagline: string;
    email: string;
    location: string;
    cvUrl: string;
    cvFileName: string;
    shareUrlFallback: string;
    shareText: string;
    socials: { github: string; linkedin: string };
  };
  about: {
    kicker: string;
    availability: string;
    title: string;
    subtitle: string;
    body: string;
    tags: AboutTag[];
  };
  skills: SkillItem[];
  projects: Project[];
  experience: Experience[];
  footer: { left: string; right: string };
  config: { projectsPageSize: number };
};