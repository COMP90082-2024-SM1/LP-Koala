'use client';

import { ProjectCard } from "@/components/project-card";
import {useEffect, useState} from "react";





export const ProjectsList = () => {

    const [projects, setProjects] = useState([])
    const getProjects = async ()=>{
        // await fetch('http://localhost:3000/projects').then((r)=>{
        //     if (r.ok){
        //         console.log(r.json())
        //     }
        // });
        const response = await fetch('http://localhost:3000/projects');
        const data = await response.json();
        setProjects(data.projects);
        console.log(data.projects);
    }

    useEffect(() => {
        getProjects()
    }, []);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            imageUrl={''}
            chaptersLength={project.chaptersLength}
            price={project.price!}
            progress={project.progress}
            category={project?.category?.name!}
          />
        ))}
      </div>
      {projects.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}