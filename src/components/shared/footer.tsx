export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-100 bg-white/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500 font-medium">
          © {currentYear} TheFarhany. All rights reserved.
        </p>

        <p className="text-sm text-slate-400 flex items-center gap-1">
          Built with
          <span className="font-medium text-slate-600 hover:text-green-600 transition-colors cursor-default">
            Next.js
          </span>
          &
          <span className="font-medium text-slate-600 hover:text-green-600 transition-colors cursor-default">
            FastAPI
          </span>
        </p>
      </div>
    </footer>
  );
}
