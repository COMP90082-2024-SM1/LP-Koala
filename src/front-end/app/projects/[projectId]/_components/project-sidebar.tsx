"use client"
import Link from "next/link"
import { PlusCircle , Puzzle} from "lucide-react"
import {Logo} from "./logo";
import {ProjectSidebarItem} from "@/app/projects/[projectId]/_components/project-sidebar-item";
import {useRouter} from "next/navigation";
import ConfirmModal from '@/components/confirm-modal';
import React, {useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

interface Module {
  _id: string;
  title: string;
}
// TODO: Fetch modules based on project id
// const modules = [
//     {
//         label: "module 1",
//         href: "module1"
//     },
//     {
//         label: "module 2",
//         href: "module2"
//     },
//     {
//         label: "module 3",
//         href: "module3"
//     }
// ]

export const ProjectSidebar =  ({projectId}: {projectId:string}) => {

  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [moduleIdToDelete, setModuleIdToDelete] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);

  const requestDelete = (moduleId: string) => {
      setModuleIdToDelete(moduleId);
      setShowConfirmModal(true);
  };
  const toggleActive = () => {
    setIsActive(!isActive);
    console.log("IsActive now:", !isActive);
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`http://localhost:3000/modules`, {
          method: 'GET',
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': Cookies.get('token')!
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch modules');
        }
        const responseObject = await response.json();
        const modules = responseObject.data as Module [];
        setModules(modules); // Assuming the backend returns an array under the key 'modules'
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };
      fetchModules();
  }, []);

  const handleDelete = async (id: string) => {
    console.log("Deleting module", id);
    setShowConfirmModal(false)
    const token = Cookies.get('token')!;
    const user = Cookies.get('user')!
    // Implement deletion logic here, such as API calls
      try {
        const response = await fetch(`http://localhost:3000/modules/${id}`,{
            method: 'DELETE',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'authorization': token
            },
            body: `{"user": ${user}}`
        })

        if (response.status === 204) {
            console.log('module',id,' deleted');
            location.reload();
        }

    } catch (error){
        console.log(error)
        // setIsLoading(false);
    }
};

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
          {modules.map((module) => (
              <div className="flex justify-between items-center" key={module._id}>
                <ProjectSidebarItem 
                    icon={Puzzle}
                    label={module.title}
                    href={`/projects/${projectId}/modules/${module._id}`}
                    onDelete={() => requestDelete(module._id)}
                />
                
            </div>
          ))}
      </div>
      <Button className="my-5 mx-auto flex-row" onClick={()=>router.push(`/projects/${projectId}/modules/create`)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Module
      </Button>
      <ConfirmModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={() => moduleIdToDelete && handleDelete(moduleIdToDelete)} />
    </div>
  )
};