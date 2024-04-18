"use client";

import {ColumnDef} from "@tanstack/react-table"
import {ArrowUpDown, Trash} from "lucide-react"

import {Button} from "@/components/ui/button";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {ClipLoader} from "react-spinners";
import {useRouter} from "next/navigation";


type User = {
  _id: string
  name: string,
  projects: string[],
  role: string
}


const currentUser = JSON.parse(Cookies.get('user')!);
const currentId = currentUser._id;



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
  {
    accessorKey: "projects",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Allocated Projects
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const projects = row.getValue('projects') as string[]
      return <div>{projects?.length > 0 && projects.map((project,index)=> <div key={index}>{project}</div>)}</div>
    }
  },
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
    id: "actions",
    cell: ({ row }) => {
      const { _id } = row.original;
      const [isModalOpen, setIsModalOpen] = useState(false)
      const [isLoading, setIsLoading] = useState(false);
      const router = useRouter();

      const onClose = () =>{
          setIsModalOpen(false)
      }
      const onClick = async ()=> {
          const token = Cookies.get('token')!
          console.log(token)
          setIsLoading(true)
          try {
            const response = await fetch(`http://localhost:3000/users/deleteUser/${_id}`,{
                  method: 'DELETE',
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    'authorization': token
                  }
                })

            if (response.status === 204) {
              setIsModalOpen(false);
              router.refresh();
            }

          } catch (error){
            console.log(error)
            setIsLoading(false);
          }
      }
      return (
        // <DropdownMenu>
        //   <DropdownMenuTrigger asChild>
        //
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="end">
        //     <Link href={`/users/${_id}`}>
        //       <DropdownMenuItem>
        //         <Pencil className="h-4 w-4 mr-2" />
        //         Edit
        //       </DropdownMenuItem>
        //     </Link>
        //   </DropdownMenuContent>
        // </DropdownMenu>
          <div>
            {(_id !== currentId) && (<Button
              onClick={()=> setIsModalOpen(true)}
              variant="ghost" className="h-4 w-8 p-0">
            <Trash className="h-4 w-4 stroke-red-600" />
          </Button>)}
            <Dialog open={isModalOpen} onOpenChange={onClose}>
              <DialogContent
                  className="bg-white
                text-black p-0
                overflow-hidden
                "
              >
                <DialogHeader className='pt-8 px-6'>
                  <DialogTitle className='text-2xl text-center font-bold'>
                    Delete User
                  </DialogTitle>
                  <DialogDescription className='text-center text-zinc-500'>
                    Are you sure you want to delete <span className='font-semibold text-sky-700'>{row.getValue('name')}</span>?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className='bg-gray-100 px-6 py-4'>
                  <div className='flex items-center justify-between w-full'>
                    <Button
                        disabled={isLoading}
                        onClick={onClose}
                        variant='ghost'
                        className='bg-sky-700 text-white w-[7rem]'
                    >
                      Cancel
                    </Button>
                    <Button
                        disabled={isLoading}
                        variant='default'
                        onClick={onClick}
                        className='bg-red-600 w-[7rem]'
                    >
                      <ClipLoader hidden={!isLoading} loading={isLoading} size={20} className='!border-sky-700 !border-b-transparent'/>

                      Confirm
                    </Button>
                  </div>

                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
      )
    }
  }
]
