"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1e3a5f] to-[#0f2847] py-24 text-white lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm backdrop-blur">
            <MapPin className="h-4 w-4" />
            Cebisa Memorial — Cemetery Management
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find the Final Resting Place of Your Loved Ones
          </h1>

          <p className="mb-10 text-lg text-white/80 sm:text-xl">
            Search our comprehensive database of cemetery records across South
            Africa. Locate graves, get directions, and preserve the memory of
            those who came before us.
          </p>

          {/* Search bar */}
          <div className="mx-auto max-w-2xl">
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={handleSearch}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  placeholder="Search by name, e.g. Thabo Molefe or Van De Kerk"
                  className="h-12 bg-white pl-10 text-foreground"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 bg-white text-primary hover:bg-white/90"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
            <p className="mt-3 text-sm text-white/60">
              Search by first name, surname, or both across all registered
              cemeteries
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div>
              <div className="text-3xl font-bold">11</div>
              <div className="text-sm text-white/60">Cemeteries</div>
            </div>
            <div>
              <div className="text-3xl font-bold">70,620+</div>
              <div className="text-sm text-white/60">Graves Registered</div>
            </div>
            <div>
              <div className="text-3xl font-bold">7</div>
              <div className="text-sm text-white/60">Municipalities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
