"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authService.login(email, password);

      Cookies.set("access_token", data.access_token, { expires: 1 });

      toast.success("Login berhasil! Welcome back bro.");

      router.push("/admin");
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail ||
          "Gagal login bro, cek email/password lu lagi deh.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-green-600 rounded-2xl mb-4 shadow-lg shadow-green-600/20">
          <LogIn className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500">Sign in to access your dashboard</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="admin@example.com"
              className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-semibold">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-green-600 focus:ring-green-600"
              />
              <span className="text-slate-600 font-medium">Remember me</span>
            </label>
            <Link
              href="#"
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-xl text-base shadow-md shadow-green-600/20"
            disabled={isLoading}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" /> Sign In
              </>
            )}
          </Button>

          <p className="text-center text-sm text-slate-400 pt-4 border-t border-slate-100">
            Demo credentials: lu bisa pake akun Supabase lu
          </p>
        </form>
      </div>

      <Link
        href="/"
        className="flex items-center text-slate-500 hover:text-green-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
      </Link>
    </div>
  );
}
