import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cemeteries } from "@/data/cemeteries";

export default function QuickLinks() {
  const featured = cemeteries.slice(0, 4);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight">
            Featured Cemeteries
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Browse some of the major cemeteries managed through our system.
            Click on any cemetery to view details and burial records.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cem) => (
            <Link key={cem.id} href={`/cemeteries`}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={cem.image}
                    alt={cem.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white">{cem.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-white/80">
                      <MapPin className="h-3 w-3" />
                      {cem.city}, {cem.province}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {cem.totalGraves.toLocaleString()} graves
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary group-hover:gap-2 transition-all">
                      View <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/cemeteries"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all cemeteries
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
