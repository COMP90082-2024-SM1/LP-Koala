"use client"
import Link from "next/link"
import { PlusCircle , Puzzle} from "lucide-react"
import { Button } from "@/components/ui/button"
import {Logo} from "./logo";
import React, {useEffect, useState} from 'react';
import {SidebarItem} from "@/app/(dashboard)/_components/sidebar-item";
import {useRouter} from "next/navigation";


// TODO: Fetch modules based on project id
const modules = [
    {
        label: "module 1",
        href: "module1"
    },
    {
        label: "module 2",
        href: "module2"
    },
    {
        label: "module 3",
        href: "module3"
    }
]

export const ProjectSidebar =  ({projectId}: {projectId:string}) => {

    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const toggleActive = () => {
      setIsActive(!isActive);
      console.log("IsActive now:", !isActive);
    };

    useEffect(() => {
        // getUserRole(Cookies.get('token')).then(r => setIsAdmin(r === 'admin'))
    }, []);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
          {modules.map((module) => (
              <SidebarItem
                  key={module.href}
                  icon={Puzzle}
                  label={module.label}
                  href={`/projects/${projectId}/modules/${module.href}`}
              />
          ))}

      </div>
        <Button className="my-5 mx-auto flex-row" onClick={()=>router.push(`/projects/${projectId}/modules/create`)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Module
        </Button>
    </div>
  )
}