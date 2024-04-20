"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button";


type User = {
  name: string,
  projects: string[],
  role: string
}
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
            type='button'
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
            type='button'
            variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
          <div>
            {row.getValue('role')}
          </div>
      )
    }
  },
  {
    accessorKey: "allocate",
    header: ({ column }) => {
      return (
        <p>Allocate</p>
      )
    },
    cell: ({ row }) => {
      const { _id } = row.original;
      return (
        <div className="flex items-center">
          <label htmlFor="editCheckbox" className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="editCheckbox"
              className="form-checkbox h-4 w-4"
              // onChange={handleCheckboxChange} // You need to define this function
              // checked={isChecked} // This state must be managed in your component
            />
          </label>
        </div>
      )
    }
  }
]
