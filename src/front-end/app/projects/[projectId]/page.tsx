"use client";
import React, { useEffect, useState } from 'react';
import {redirect} from "next/navigation";
import Cookies from "js-cookie";

interface Module {
    _id: string;
    title: string;
  }

interface ProjectProps  {
    params: {projectId: string}
}

async function Page({params}:ProjectProps) {
    const [firstModuleId, setFirstModuleId] = useState<string | null>(null);

    useEffect(() => {
        const fetchFirstModule = async () => {
          try {
            const response = await fetch(`http://localhost:3000/projects/${params}/modules`, {
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
            const modules = responseObject.data as Module[];
            if (modules.length > 0) {
              setFirstModuleId(modules[0]._id);  // Save the first module ID
            } else {
              console.log("No modules found");
            }
          } catch (error) {
            console.error('Error fetching modules:', error);
          }
        };
    
        fetchFirstModule();
    }, [params]);

    useEffect(() => {
        if (firstModuleId) {
            redirect(`/projects/${params.projectId}/modules/${firstModuleId}`)
        }
      }, [firstModuleId]);

    

}

export default Page;