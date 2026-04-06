import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-bold text-xl tracking-tight">
          TheFarhany
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-md font-medium text-gray-600">
          <Link
            href="/"
            className="text-black transition-colors hover:text-black"
          >
            Home
          </Link>
          <Link href="/projects" className="transition-colors hover:text-black">
            Projects
          </Link>
          <Link
            href="/repositories"
            className="transition-colors hover:text-black"
          >
            Repositories
          </Link>
        </nav>

        <div className="flex items-center">
          <Button
            className="bg-black hover:bg-black/80 text-white rounded-md px-6"
            asChild
          >
            <Link href="/#contact">Contact</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
