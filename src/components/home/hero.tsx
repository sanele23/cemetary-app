"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, MapPin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    router.push(`/search${params}`);
  };

  return (
    <section className="bg-white pb-24 pt-10 lg:pt-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-light tracking-tight text-[#1f2531] sm:text-6xl md:text-7xl">
            Discover the Ancestral Past
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-[#4a5667]">
            Access over a century of curated genealogical records and plot data
            within our digital sanctuary. Navigate the legacy with quiet
            reverence.
          </p>

          <div className="mx-auto mt-14 max-w-5xl">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="pointer-events-none absolute left-8 top-1/2 h-6 w-6 -translate-y-1/2 text-[#a7b0bb]" />
                <Input
                  name="q"
                  placeholder="Search records by name, plot number, or section..."
                  className="h-20 rounded-2xl border-0 bg-[#f3f5f4] pl-20 pr-8 text-xl text-[#243040] placeholder:text-[#a4aebb] focus-visible:ring-2 focus-visible:ring-[#dce2df]"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="mt-20 grid gap-12 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-light tracking-tight text-[#1f2531] sm:text-6xl">
                142,804
              </p>
              <p className="mt-3 text-xs font-semibold tracking-[0.28em] text-[#a3adb8]">
                TOTAL RECORDS
              </p>
            </div>
            <div>
              <p className="text-5xl font-light tracking-tight text-[#1f2531] sm:text-6xl">
                85,210
              </p>
              <p className="mt-3 text-xs font-semibold tracking-[0.28em] text-[#a3adb8]">
                HISTORICAL PLOTS
              </p>
            </div>
            <div>
              <p className="text-5xl font-light tracking-tight text-[#1f2531] sm:text-6xl">
                1,102
              </p>
              <p className="mt-3 text-xs font-semibold tracking-[0.28em] text-[#a3adb8]">
                RECENT INTERNMENTS
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              className="h-14 rounded-full bg-[#758A81] px-10 text-xs font-semibold tracking-[0.2em] text-white hover:bg-[#6c8078]"
            >
              <Link href="/cemeteries">
                <MapPin className="h-4 w-4" />
                INTERACTIVE MAP VIEW
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-14 rounded-full border-[#d9dedb] bg-white px-10 text-xs font-semibold tracking-[0.2em] text-[#1f2531] hover:bg-[#f8faf9] hover:text-[#1f2531]"
            >
              <Link href="/search">
                <Info className="h-4 w-4" />
                REQUEST INFORMATION
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
