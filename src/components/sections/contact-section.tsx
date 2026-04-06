"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="container mx-auto px-4 md:px-8 py-24 mb-10"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Get In Touch
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Have a project in mind? Let's work together to create something
          amazing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Name</label>
            <Input
              placeholder="Your name"
              className="bg-slate-50/50 border-slate-200 h-10 ps-3"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-slate-50/50 border-slate-200 h-10 ps-3"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Message
            </label>
            <Textarea
              placeholder="Tell me about your project..."
              className="bg-slate-50/50 border-slate-200 min-h-37.5 resize-none"
            />
          </div>
          <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-md">
            Send Message <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-xl text-slate-900 mb-6">
            Connect with me
          </h3>

          <div className="space-y-4 mb-10">
            <Link
              href="https://github.com/thefarhany"
              target="_blank"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 group-hover:border-green-200">
                  <FaGithub className="h-5 w-5 text-slate-700" />
                </div>
                <span className="font-medium text-slate-700">GitHub</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-green-600" />
            </Link>

            <Link
              href="https://www.linkedin.com/in/destria-farhany"
              target="_blank"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 group-hover:border-green-200">
                  <FaLinkedin className="h-5 w-5 text-slate-700" />
                </div>
                <span className="font-medium text-slate-700">LinkedIn</span>
              </div>
              <ArrowUpRight className="h-5 w-5 text-slate-400 group-hover:text-green-600" />
            </Link>

            <a
              href="mailto:d.farhany41@gmail.com"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 group-hover:border-green-200">
                  <Mail className="h-5 w-5 text-slate-700" />
                </div>
                <span className="font-medium text-slate-700">
                  d.farhany41@gmail.com
                </span>
              </div>
            </a>
          </div>

          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
            <p className="text-neutral-800 font-medium italic">
              "Working with passion to create digital experiences that matter.
              Always excited to collaborate on innovative projects."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
