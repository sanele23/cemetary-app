"use client";

import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cemeteries } from "@/data/cemeteries";

export interface SearchParams {
  firstName: string;
  surname: string;
  maidenName: string;
  idNumber: string;
  dateOfDeath: string;
  cemeteryId: string;
}

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading?: boolean;
  initialValues?: Partial<SearchParams>;
}

export default function SearchForm({
  onSearch,
  isLoading,
  initialValues,
}: SearchFormProps) {
  const [form, setForm] = useState<SearchParams>({
    firstName: initialValues?.firstName || "",
    surname: initialValues?.surname || "",
    maidenName: initialValues?.maidenName || "",
    idNumber: initialValues?.idNumber || "",
    dateOfDeath: initialValues?.dateOfDeath || "",
    cemeteryId: initialValues?.cemeteryId || "all",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(form);
  };

  const handleReset = () => {
    const empty: SearchParams = {
      firstName: "",
      surname: "",
      maidenName: "",
      idNumber: "",
      dateOfDeath: "",
      cemeteryId: "all",
    };
    setForm(empty);
    onSearch(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="e.g. Thabo"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="surname">Surname</Label>
          <Input
            id="surname"
            placeholder="e.g. Molefe"
            value={form.surname}
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maidenName">Maiden Name</Label>
          <Input
            id="maidenName"
            placeholder="e.g. Nkosi"
            value={form.maidenName}
            onChange={(e) => setForm({ ...form, maidenName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">ID Number</Label>
          <Input
            id="idNumber"
            placeholder="e.g. 5504125087083"
            value={form.idNumber}
            onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfDeath">Date of Death</Label>
          <Input
            id="dateOfDeath"
            type="date"
            value={form.dateOfDeath}
            onChange={(e) => setForm({ ...form, dateOfDeath: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cemetery">Cemetery</Label>
          <select
            id="cemetery"
            value={form.cemeteryId}
            onChange={(e) => setForm({ ...form, cemeteryId: e.target.value })}
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="all">All Cemeteries</option>
            {cemeteries.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isLoading}>
          <Search className="mr-2 h-4 w-4" />
          {isLoading ? "Searching..." : "Search Records"}
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </form>
  );
}
