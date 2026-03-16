"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { graves } from "@/data/graves";

export default function AdminGravesPage() {
  const [search, setSearch] = useState("");

  const filtered = graves.filter(
    (g) =>
      g.firstName.toLowerCase().includes(search.toLowerCase()) ||
      g.surname.toLowerCase().includes(search.toLowerCase()) ||
      g.graveNumber.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Graves</h1>
          <p className="text-muted-foreground">
            View and manage all grave records
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Grave Record
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Grave Records ({filtered.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or grave no..."
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
                <TableHead>Cemetery</TableHead>
                <TableHead>Section</TableHead>
                <TableHead>Grave No.</TableHead>
                <TableHead>Date of Death</TableHead>
                <TableHead>Date of Burial</TableHead>
                <TableHead className="w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((g) => (
                <TableRow key={g.id}>
                  <TableCell className="font-medium">
                    {g.firstName} {g.surname}
                  </TableCell>
                  <TableCell>{g.cemeteryName}</TableCell>
                  <TableCell>{g.section}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {g.graveNumber}
                  </TableCell>
                  <TableCell>{formatDate(g.dateOfDeath)}</TableCell>
                  <TableCell>{formatDate(g.dateOfBurial)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Link href={`/graves/${g.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
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
