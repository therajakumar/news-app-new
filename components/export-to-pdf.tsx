import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ExportSnapshotToPDF = ({
  elementId,
  buttonVariant,
}: {
  elementId: string;
  buttonVariant?: "default" | "outline" | "ghost";
}) => {
  const [loading, setLoading] = useState(false);

  const exportToPDF = async () => {
    const element = document.getElementById(elementId);
    const exportButton = document.getElementById("exportButton");

    if (!element) {
      console.error(`Element with ID "${elementId}" not found.`);
      return;
    }

    // Hide the export button during capture
    if (exportButton) exportButton.style.display = "none";

    setLoading(true); // Start the loading process

    try {
      // Capture the element as a canvas, excluding shadows if needed
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate scaling to fit the content in PDF dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const newWidth = imgWidth * scale;
      const newHeight = imgHeight * scale;

      pdf.addImage(imgData, "PNG", 0, 0, newWidth, newHeight);

      // Save the PDF
      pdf.save("Snapshot.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Show the export button again after capture
      if (exportButton) exportButton.style.display = "inline-block";
      setLoading(false); // End the loading process
    }
  };

  return (
    <div>
      <Button
        id="exportButton"
        onClick={exportToPDF}
        disabled={loading}
        variant={buttonVariant}
      >
        {loading ? "Exporting..." : "Export to PDF"}
      </Button>
    </div>
  );
};
