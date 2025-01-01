import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DateWisePayoutTableProps {
  dateWisetoalPayout: {
    date: Date;
    total: number;
  }[];
}

export function DateWisePayoutTable({
  dateWisetoalPayout,
}: DateWisePayoutTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Date</TableHead>
          <TableHead>Total Payout</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dateWisetoalPayout.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.date.toLocaleDateString()}</TableCell>
            <TableCell>${item.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
