"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import type { Grave } from "@/data/types";

interface ResultsTableProps {
  results: Grave[];
  isLoading?: boolean;
  hasSearched?: boolean;
}

export default function ResultsTable({
  results,
  isLoading,
  hasSearched,
}: ResultsTableProps) {
  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Searching records...
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        Use the search form above to find burial records.
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        No records found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Cemetery</TableHead>
            <TableHead>Section</TableHead>
            <TableHead>Grave No.</TableHead>
            <TableHead>Date of Burial</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((grave) => (
            <TableRow key={grave.id} className="group">
              <TableCell className="font-medium">
                {grave.firstName} {grave.surname}
                {grave.maidenName && (
                  <span className="ml-1 text-muted-foreground">
                    (née {grave.maidenName})
                  </span>
                )}
              </TableCell>
              <TableCell>{grave.cemeteryName}</TableCell>
              <TableCell>{grave.section}</TableCell>
              <TableCell className="font-mono text-sm">
                {grave.graveNumber}
              </TableCell>
              <TableCell>{formatDate(grave.dateOfBurial)}</TableCell>
              <TableCell>
                <Link
                  href={`/graves/${grave.id}`}
                  className="inline-flex items-center gap-1 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
                >
                  View
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="border-t px-4 py-3 text-sm text-muted-foreground">
        {results.length} record{results.length !== 1 ? "s" : ""} found
      </div>
    </div>
  );
}
