import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
