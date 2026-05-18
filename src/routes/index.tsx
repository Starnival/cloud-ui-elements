import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import data from "@/data/portfolio.json";
import type { PortfolioData, Project, Tag } from "@/components/portfolio/types";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ThemeSection } from "@/components/portfolio/ThemeSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { ProjectModal } from "@/components/portfolio/ProjectModal";
import { ShareModal } from "@/components/portfolio/ShareModal";

const portfolio = data as PortfolioData;

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: portfolio.meta.title },
      { name: "description", content: portfolio.meta.description },
      { property: "og:title", content: portfolio.meta.ogTitle },
      { property: "og:description", content: portfolio.meta.ogDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Portfolio() {
  const [dark, setDark] = useState(false);
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<Tag | "All">("All");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState(portfolio.hero.shareUrlFallback);

  useEffect(() => { setShareUrl(window.location.href); }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setDark(stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    if (!openProject && !shareOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [openProject, shareOpen]);

  return (
    <main className="min-h-[100dvh] w-full bg-background text-foreground p-3 sm:p-4 md:p-6 lg:h-screen lg:overflow-hidden">
      <style>{`
          @media (min-width: 1024px) {
            .portfolio-grid {
              grid-template-areas:
                "hero hero hero about about about about about about tog tog tog"
                "hero hero hero about about about about about about tog tog tog"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "skills skills proj proj proj proj proj proj proj proj exp exp"
                "foot foot foot foot foot foot foot foot foot foot foot foot";
            }
          }
      `}</style>

      <div className="portfolio-grid w-full grid gap-4 md:gap-5 lg:h-full lg:grid-cols-12 lg:[grid-template-rows:repeat(8,minmax(0,1fr))]">
        <HeroSection hero={portfolio.hero} onShare={() => setShareOpen(true)} />
        <AboutSection about={portfolio.about} />
        <ThemeSection dark={dark} setDark={setDark} />
        <SkillsSection skills={portfolio.skills} filter={filter} setFilter={setFilter} />
        <ProjectsSection
          projects={portfolio.projects}
          filter={filter}
          pageSize={portfolio.config.projectsPageSize}
          onOpen={setOpenProject}
        />
        <ExperienceSection experience={portfolio.experience} />
        <FooterSection left={portfolio.footer.left} right={portfolio.footer.right} />
      </div>

      {openProject && <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />}
      {shareOpen && (
        <ShareModal
          shareUrl={shareUrl}
          shareText={portfolio.hero.shareText}
          onClose={() => setShareOpen(false)}
        />
      )}
    </main>
  );
}