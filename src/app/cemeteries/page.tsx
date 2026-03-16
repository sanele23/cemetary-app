"use client";

import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import CemeteryCard from "@/components/cemetery/cemetery-card";
import { getCemeteries, getCemeteryCities } from "@/services/mock-api";
import type { Cemetery } from "@/data/types";

export default function CemeteriesPage() {
  const [cemeteries, setCemeteries] = useState<Cemetery[]>([]);
  const [selectedCity, setSelectedCity] = useState("all");
  const [loading, setLoading] = useState(true);
  const cities = getCemeteryCities();

  useEffect(() => {
    setLoading(true);
    getCemeteries(selectedCity).then((data) => {
      setCemeteries(data);
      setLoading(false);
    });
  }, [selectedCity]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Building2 className="h-5 w-5 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Cemeteries</h1>
        </div>
        <p className="text-muted-foreground">
          Browse cemeteries managed through our system. Filter by city to find
          cemeteries in your area.
        </p>
      </div>

      {/* Filter */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCity("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
            selectedCity === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All Cities
        </button>
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
              selectedCity === city
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {cemeteries.length} cemeter
            {cemeteries.length !== 1 ? "ies" : "y"}
            {selectedCity !== "all" && ` in ${selectedCity}`}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cemeteries.map((cem) => (
              <CemeteryCard key={cem.id} cemetery={cem} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
