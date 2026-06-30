"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Search,
  Shield,
  ShieldCheck,
  Eye,
  UserCog,
} from "lucide-react";
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
import { getAdminUsers } from "@/services/mock-api";
import type { AdminUser } from "@/data/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdminUsers().then(setUsers);
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.municipality.toLowerCase().includes(search.toLowerCase()),
  );

  const roleIcon = (role: string) => {
    switch (role) {
      case "super_admin":
        return <ShieldCheck className="h-3.5 w-3.5" />;
      case "admin":
        return <Shield className="h-3.5 w-3.5" />;
      case "clerk":
        return <UserCog className="h-3.5 w-3.5" />;
      default:
        return <Eye className="h-3.5 w-3.5" />;
    }
  };

  const roleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";
      case "admin":
        return "Admin";
      case "clerk":
        return "Clerk";
      case "viewer":
        return "Viewer";
      default:
        return role;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">
            Manage system users and their access levels
          </p>
        </div>
        <Button className="gap-2 w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="min-w-0">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>All Users ({filtered.length})</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="space-y-3 sm:hidden">
            {filtered.map((user) => (
              <article
                key={user.id}
                className="rounded-lg border border-border/80 bg-background p-3"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold leading-tight">{user.name}</p>
                  <Badge variant={user.status === "active" ? "success" : "secondary"}>
                    {user.status}
                  </Badge>
                </div>

                <dl className="space-y-1 text-xs">
                  <div>
                    <dt className="text-muted-foreground">Email</dt>
                    <dd className="break-all font-medium">{user.email}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Role</dt>
                    <dd className="flex items-center gap-1.5 font-medium">
                      {roleIcon(user.role)}
                      {roleLabel(user.role)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Municipality</dt>
                    <dd className="font-medium">{user.municipality}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Last Login</dt>
                    <dd className="font-medium">
                      {new Date(user.lastLogin).toLocaleDateString("en-ZA")}
                    </dd>
                  </div>
                </dl>

                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-3.5 w-3.5" />
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
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Municipality</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {roleIcon(user.role)}
                        <span className="text-sm">{roleLabel(user.role)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.municipality}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active" ? "success" : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {new Date(user.lastLogin).toLocaleDateString("en-ZA")}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
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
