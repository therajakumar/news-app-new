"use client"

import { useState } from "react"
import { Category } from "@/types/category"
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { CategoryDialog } from "./category-dialog"
import { Button } from "@/components/ui/button"

const initialData: Category[] = [
  { category: "Groceries", amount: 500 },
  { category: "Utilities", amount: 200 },
  { category: "Entertainment", amount: 150 },
  { category: "Transportation", amount: 100 },
]

export function CategoryTable() {
  const [data, setData] = useState<Category[]>(initialData)

  const addCategory = (newCategory: Category) => {
    setData([...data, newCategory])
  }

  const editCategory = (editedCategory: Category, index: number) => {
    const newData = [...data]
    newData[index] = editedCategory
    setData(newData)
  }

  const deleteCategory = (index: number) => {
    const newData = data.filter((_, i) => i !== index)
    setData(newData)
  }

  const actionColumn = {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original
      const rowIndex = row.index

      return (
        <div className="flex items-center gap-2">
          <CategoryDialog
            category={category}
            onSave={(editedCategory) => editCategory(editedCategory, rowIndex)}
            trigger={<Button variant="outline" size="sm">Edit</Button>}
          />
          <Button variant="outline" size="sm" onClick={() => deleteCategory(rowIndex)}>
            Delete
          </Button>
        </div>
      )
    },
  }

  const columnsWithActions = [...columns.filter(col => col.id !== "actions"), actionColumn]

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <CategoryDialog
          onSave={addCategory}
          trigger={<Button>Add Category</Button>}
        />
      </div>
      <DataTable columns={columnsWithActions} data={data} />
    </div>
  )
}

