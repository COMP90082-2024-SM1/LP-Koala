'use client';
import { ProjectCard } from "@/components/project-card";
import {useEffect, useState} from "react";
import {ClipLoader} from "react-spinners";
import {getUserRole} from "@/lib/utils";
import Cookies from "js-cookie";



export const ProjectsList = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState('');
    const getProjectsAndRole = async ()=>{
        const token = Cookies.get('token')!;
        await fetch('http://localhost:3000/projects', {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "authorization": token
            }
        }).then(r=>{
            if (r.ok){
                setIsLoading(false);
                r.json().then(r=>setProjects(r.data))
            }
        })

        const role =  await getUserRole(Cookies.get('token'));
        setRole(role);
    }

    useEffect(() => {
        getProjectsAndRole()
    }, []);
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            id={project._id}
            name={project.title}
            imageUrl={'/'}
            isRater={role === 'rater'}
          />
        ))}
      </div>
      {projects.length === 0 && !isLoading && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No Projects found
        </div>
      )}

        <div className='justify-center flex'>
            <ClipLoader loading={isLoading} size={50} className='!border-sky-700 !border-b-transparent' />
        </div>
    </div>
  )
}