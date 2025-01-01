import { Button, buttonVariants } from "@/components/ui/button";

export const ExportCSVButton = ({
  data,
  filename,
  buttonVariant,
}: {
  data: any[];
  filename: string;
  buttonVariant?: "outline" | "ghost" | "default";
}) => {
  const convertToCSV = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Add headers
    csvRows.push(headers.join(","));

    // Add data rows
    for (const row of data) {
      csvRows.push(headers.map((header) => row[header]).join(","));
    }

    return csvRows.join("\n");
  };

  const exportToCSV = (data: any[], filename: string) => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };
  const handleExport = () => {
    exportToCSV(data, filename);
  };

  return (
    <Button onClick={handleExport} variant={buttonVariant}>
      Export to CSV
    </Button>
  );
};
