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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Cemeteries</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove cemetery records
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Cemetery
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Cemeteries ({filtered.length})</CardTitle>
            <div className="relative w-64">
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
        <CardContent>
          <Table>
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
                  <TableCell>{cem.established}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
}
