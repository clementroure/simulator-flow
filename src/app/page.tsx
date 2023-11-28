import Link from "next/link";
import { GithubIcon } from "lucide-react";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <main className="text-balance container grid max-w-prose items-center gap-6 space-y-4 pb-8 pt-6 md:py-10">
      <div className="flex min-h-[50vh] flex-col justify-center gap-3">
        <h1 className="text-5xl font-bold">{siteConfig.title}</h1>
        <p className="text-slate-500">{siteConfig.description}</p>
        <div className="space-x-2">
          <Link
            className={cn(buttonVariants(), "space-x-2")}
            href="https://github.com/A7med3bdulBaset/next-template"
          >
            <GithubIcon />
            <span>Github</span>
          </Link>
          <ThemeToggle variant="outline" size="icon" />
        </div>
      </div>
    </main>
  );
}
