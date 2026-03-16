"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchFormComponent, {
  type SearchParams,
} from "@/components/search/search-form";
import ResultsTable from "@/components/search/results-table";
import { searchGraves } from "@/services/mock-api";
import type { Grave } from "@/data/types";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<Grave[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const initialSurname = searchParams.get("surname") || "";
  const initialCemeteryId = searchParams.get("cemeteryId") || "all";

  // Auto-search if URL params are present
  useEffect(() => {
    if (initialSurname || initialCemeteryId !== "all") {
      handleSearch({
        firstName: "",
        surname: initialSurname,
        maidenName: "",
        idNumber: "",
        dateOfDeath: "",
        cemeteryId: initialCemeteryId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (params: SearchParams) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await searchGraves(params);
      setResults(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
            <Search className="h-5 w-5 text-accent-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Find a Grave</h1>
        </div>
        <p className="text-muted-foreground">
          Search our records to find the burial site of a loved one. Fill in any
          combination of fields below.
        </p>
      </div>

      {/* Search Form Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Burial Records</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchFormComponent
            onSearch={handleSearch}
            isLoading={isLoading}
            initialValues={{
              surname: initialSurname,
              cemeteryId: initialCemeteryId,
            }}
          />
        </CardContent>
      </Card>

      {/* Results */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Search Results</h2>
        <ResultsTable
          results={results}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
