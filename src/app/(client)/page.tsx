"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { GithubRepos } from "@/components/sections/github-repos";
import { ContactSection } from "@/components/sections/contact-section";
import { useTitle } from "@/hooks/use-title";

export default function HomePage() {
  useTitle("");

  return (
    <div className="flex flex-col gap-10 pb-10">
      <HeroSection />
      <div className="bg-slate-50/50">
        <AboutSection />
      </div>
      <FeaturedProjects />
      <GithubRepos />
      <ContactSection />
    </div>
  );
}
