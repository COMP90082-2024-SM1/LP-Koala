"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {  } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // {
  //   accessorKey: "projects",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Allocated Projects
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const price = parseFloat(row.getValue("price") || "0");
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD"
  //     }).format(price);
  //     console.log(row.getValue('projects'))

  //     return <div>{row.getValue('projects')[0]}</div>
  //   }
  // },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") || false;

      return (
        // <Badge className={cn(
        //   "bg-slate-500",
        //   isPublished && "bg-sky-700"
        // )}>
        //   {isPublished ? "Published" : "Draft"}
        // </Badge>
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
      const { id } = row.original;

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
