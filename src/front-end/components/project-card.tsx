import Image from "next/image";
import Link from "next/link";
import { Trash, MoreHorizontal, Pencil } from "lucide-react"
import ConfirmModal from './confirm-modal';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";



interface ProjectCardProps {
  id: string;
  name: string;
  imageUrl: string;
};

export const ProjectCard = ({
  id,
  name,
  imageUrl,
}: ProjectCardProps) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmDelete = () => {
    console.log("Deleting project", id);
    setShowConfirmModal(false);
    // Implement deletion logic here, such as API calls
  };

  return (

      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className='float-right'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-4 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/projects/create`}>
                <DropdownMenuItem>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <button onClick={() => setShowConfirmModal(true)} className="w-full text-left">
                <DropdownMenuItem>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href={`/projects/${id}`}>
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={name}
            src={imageUrl}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {name}
          </div>
          {/*<p className="text-xs text-muted-foreground">*/}
          {/*  {category}*/}
          {/*</p>*/}
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              {/*<IconBadge size="sm" icon={BookOpen} />*/}
              {/*<span>*/}
              {/*  {chaptersLength} {chaptersLength === 1 ? "Module" : "Modules"}*/}
              {/*</span>*/}
            </div>
          </div>

          {/*{progress !== null ? (*/}
          {/*  <ProjectProgress*/}
          {/*    variant={progress === 100 ? "success" : "default"}*/}
          {/*    size="sm"*/}
          {/*    value={progress}*/}
          {/*  />*/}
          {/*) : (*/}

          {/*)}*/}
        </div>
        </Link>

        <ConfirmModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={handleConfirmDelete} />
      </div>
  )
}