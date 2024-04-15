'use client';

import { ProjectCard } from "@/components/project-card";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";





export const ProjectsList = () => {

    const [projects, setProjects] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const getProjects = async ()=>{

        await fetch('http://localhost:3000/projects').then(r=>{
            if (r.ok){
                setIsLoading(false);
                r.json().then(data=>setProjects(data.projects))
            }
        })
        // const data =  response.json().then();
        // setProjects(data.projects);
        // console.log(data.projects);
    }

    useEffect(() => {
        getProjects()
    }, []);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            name={project.name}
            imageUrl={'/'}
            chaptersLength={project.chaptersLength}
            price={project.price!}
            progress={project.progress}
            category={project?.category?.name!}
          />
        ))}
      </div>
      {projects.length === 0 && !isLoading && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}

        <div className='justify-center flex'>
            <ClipLoader loading={isLoading} size={50} className='!border-sky-700 !border-b-transparent' />
        </div>
    </div>
  )
}