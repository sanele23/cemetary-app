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
    <Card>
      <CardHeader>
        <CardTitle>Recent Burial Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
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
                <TableCell className="font-medium">
                  {record.deceasedName}
                </TableCell>
                <TableCell>{record.cemeteryName}</TableCell>
                <TableCell className="font-mono text-sm">
                  {record.graveNumber}
                </TableCell>
                <TableCell>{formatDate(record.dateOfBurial)}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant(record.status)}>
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
