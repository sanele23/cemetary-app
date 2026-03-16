"use client";

import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
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
import { formatDate } from "@/lib/utils";
import { getBurials } from "@/services/mock-api";
import type { Burial } from "@/data/types";

export default function AdminBurialsPage() {
  const [burials, setBurials] = useState<Burial[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBurials().then(setBurials);
  }, []);

  const filtered = burials.filter(
    (b) =>
      b.deceasedName.toLowerCase().includes(search.toLowerCase()) ||
      b.cemeteryName.toLowerCase().includes(search.toLowerCase()),
  );

  const statusVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "success" as const;
      case "scheduled":
        return "warning" as const;
      case "pending":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const typeLabel = (type: string) => {
    switch (type) {
      case "standard":
        return "Standard";
      case "cremation":
        return "Cremation";
      case "reburial":
        return "Reburial";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Burial Records</h1>
          <p className="text-muted-foreground">
            Manage and track all burial registrations
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Register Burial
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Burial Records ({filtered.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search records..."
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
                <TableHead>Deceased</TableHead>
                <TableHead>Cemetery</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Grave No.</TableHead>
                <TableHead>Date of Burial</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registered By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">
                    {b.deceasedName}
                  </TableCell>
                  <TableCell>{b.cemeteryName}</TableCell>
                  <TableCell>{b.section}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {b.graveNumber}
                  </TableCell>
                  <TableCell>{formatDate(b.dateOfBurial)}</TableCell>
                  <TableCell>{typeLabel(b.burialType)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(b.status)}>{b.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {b.registeredBy}
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
