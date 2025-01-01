"use client";

import { CategoryDialog } from "@/components/category-dialog";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { usePayout } from "@/hooks/use-payout";
import { Category } from "@/types";
import React from "react";
import { ExportSnapshotToPDF } from "./export-to-pdf";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ExportCSVButton } from "./export-to-csv";

function PayoutDashboard() {
  const { category, addCateory, deleteCategory, updateCategory } = usePayout();

  const actionColumn = {
    id: "actions",
    cell: ({
      row,
    }: {
      row: {
        original: Category;
      };
    }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <CategoryDialog
            category={category}
            onSave={(editedCategory) => updateCategory(editedCategory)}
            trigger={
              <Button variant="outline" size="sm">
                Edit
              </Button>
            }
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => deleteCategory(category.category)}
          >
            Delete
          </Button>
        </div>
      );
    },
  };

  const columnsWithActions = [
    ...columns.filter((col) => col.id !== "actions"),
    actionColumn,
  ];
  return (
    <div className="container mx-auto py-10 px-1">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h1 className="text-4xl font-bold mb-8">Categories</h1>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default">Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" id="exportButton">
              <ExportSnapshotToPDF
                elementId="analytics-content"
                buttonVariant="ghost"
              />
              <ExportCSVButton
                data={category}
                filename="categories"
                buttonVariant="ghost"
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <CategoryDialog
            onSave={addCateory}
            trigger={<Button>Add Category</Button>}
          />
        </div>
      </div>
      <DataTable
        columns={columnsWithActions}
        data={category}
        id="analytics-content"
      />
    </div>
  );
}

export default PayoutDashboard;
