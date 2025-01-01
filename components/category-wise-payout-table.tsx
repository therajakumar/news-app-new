import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CategoryWisePayoutTableProps {
  categoryWisePayout: {
    category: string;
    total: number;
  }[];
}

export function CategoryWisePayoutTable({
  categoryWisePayout,
}: CategoryWisePayoutTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[180px]">Category</TableHead>
          <TableHead>Total Payout</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categoryWisePayout.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.category}</TableCell>
            <TableCell>${item.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
