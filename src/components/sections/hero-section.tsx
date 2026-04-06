import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 md:px-20 py-10 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="flex-1 space-y-6">
        <div className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
          Available for freelance work
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-neutral-900">
          Hi, I'm Destria
          <br />
          Farhany
        </h1>

        <div className="space-y-4 max-w-lg text-slate-600 text-lg">
          <p className="font-medium text-slate-800">
            Frontend Developer & UI/UX Enthusiast
          </p>
          <p className="leading-relaxed">
            I craft beautiful, performant web applications with modern
            technologies. Passionate about creating seamless user experiences
            and clean, maintainable code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Button
            className="bg-black hover:bg-black/80 text-white px-8 py-6 rounded-xl text-base shadow-sm"
            asChild
          >
            <Link href="/projects">
              View Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>

          <Button
            variant="outline"
            className="border-neutral-600 text-neutral-700 hover:bg-neutral-50 px-8 py-6 rounded-xl text-base"
            asChild
          >
            <Link href="#contact">Contact Me</Link>
          </Button>
        </div>
      </div>

      <div className="flex-1 relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
        <div className="absolute inset-0 bg-neutral-100/80 rounded-3xl rotate-3 transform -z-10 mt-8 ml-8"></div>

        <img
          src="/images/hero-svg.svg"
          alt="Portfolio Illustration"
          className="w-full h-full object-contain relative z-10"
        />
      </div>
    </section>
  );
}
