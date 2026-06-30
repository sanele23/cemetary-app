import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Burial } from "@/data/types";

interface RecentRecordsProps {
  records: Burial[];
}

export default function RecentRecords({ records }: RecentRecordsProps) {
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

  return (
    <Card className="min-w-0">
      <CardHeader>
        <CardTitle>Recent Burial Records</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="space-y-3 sm:hidden">
          {records.map((record) => (
            <article
              key={record.id}
              className="rounded-lg border border-border/80 bg-background p-3"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <p className="text-sm font-semibold leading-tight">
                  {record.deceasedName}
                </p>
                <Badge variant={statusVariant(record.status)}>
                  {record.status}
                </Badge>
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                <div>
                  <dt className="text-muted-foreground">Cemetery</dt>
                  <dd className="font-medium text-foreground">
                    {record.cemeteryName}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Grave No.</dt>
                  <dd className="font-mono text-foreground">
                    {record.graveNumber}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="font-medium text-foreground">
                    {formatDate(record.dateOfBurial)}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        <div className="hidden sm:block">
          <Table className="min-w-160">
            <TableHeader>
              <TableRow>
                <TableHead>Deceased</TableHead>
                <TableHead>Cemetery</TableHead>
                <TableHead>Grave No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {record.deceasedName}
                  </TableCell>
                  <TableCell>{record.cemeteryName}</TableCell>
                  <TableCell className="font-mono text-sm whitespace-nowrap">
                    {record.graveNumber}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatDate(record.dateOfBurial)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(record.status)}>
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
