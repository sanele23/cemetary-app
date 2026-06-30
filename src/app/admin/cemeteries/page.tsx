"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCemeteries } from "@/services/mock-api";
import type { Cemetery } from "@/data/types";

export default function AdminCemeteriesPage() {
  const [cemeteries, setCemeteries] = useState<Cemetery[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCemeteries().then(setCemeteries);
  }, []);

  const filtered = cemeteries.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Cemeteries</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove cemetery records
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Cemetery
        </Button>
      </div>

      <Card className="min-w-0">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Cemeteries ({filtered.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cemeteries..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="space-y-3 sm:hidden">
            {filtered.map((cem) => (
              <article
                key={cem.id}
                className="rounded-lg border border-border/80 bg-background p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-tight">{cem.name}</p>
                  <Badge variant="success">{cem.availablePlots.toLocaleString()}</Badge>
                </div>

                <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <div>
                    <dt className="text-muted-foreground">City</dt>
                    <dd className="font-medium">{cem.city}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Province</dt>
                    <dd className="font-medium">{cem.province}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Total Graves</dt>
                    <dd className="font-medium">{cem.totalGraves.toLocaleString()}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Established</dt>
                    <dd className="font-medium">{cem.established}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-muted-foreground">Available Plots</dt>
                    <dd className="font-medium text-emerald-600">
                      {cem.availablePlots.toLocaleString()}
                    </dd>
                  </div>
                </dl>

                <div className="mt-2 flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="hidden sm:block">
            <Table className="min-w-200">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Province</TableHead>
                  <TableHead>Total Graves</TableHead>
                  <TableHead>Available Plots</TableHead>
                  <TableHead>Established</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((cem) => (
                  <TableRow key={cem.id}>
                    <TableCell className="font-medium">{cem.name}</TableCell>
                    <TableCell>{cem.city}</TableCell>
                    <TableCell>{cem.province}</TableCell>
                    <TableCell>{cem.totalGraves.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="success">
                        {cem.availablePlots.toLocaleString()}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{cem.established}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
