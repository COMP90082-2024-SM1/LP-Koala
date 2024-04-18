"use client"
import { redirect } from "next/navigation";
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Logo} from "./logo";
import React, { useState } from 'react';
import { ProjectSidebarItem } from "./project-sidebar-item";



export const ProjectSidebar =  ({
  // course ,
  progressCount,
}:{course?:any, progressCount?:number}) => {

    const [isActive, setIsActive] = useState(false);
    const toggleActive = () => {
      setIsActive(!isActive);
      console.log("IsActive now:", !isActive);
    };

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex-grow">
          <Link href="/projects/661a8acb802cb862e77a7343/modules/1" className="mt-auto">
            <button
              type="button"
              className="w-40 mb-4 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-10 transition-all hover:text-slate-600 hover:bg-slate-300/20"
              onClick={toggleActive} // Set up the event handler here
              style={{
                backgroundColor: isActive ? '#bee3f8' : '', // Assuming '#bee3f8' is the color code for 'bg-sky-200'
                color: isActive ? '#3182ce' : '', // Assuming '#3182ce' is the color code for 'text-sky-700'
                borderColor: isActive ? '#3182ce' : '',
              }}              
            >
              <div className="flex items-center gap-x-2 py-4">
                Module 1
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  opacity: isActive ? 100 : 0,
                  border: '2px solid sky-700',
                  height: '100%',
                  transition: 'all 0.3s',
                }}
              />
            </button>
          </Link>
        </div>
        <div className="flex-grow">
        <Link href="/projects/661a8acb802cb862e77a7343/modules/1" className="mt-auto">
            <button
              type="button"
              className="w-40 mt-8 mb-8 ml-8 mr-0 flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-10 transition-all hover:text-slate-600 hover:bg-slate-300/20"
              onClick={toggleActive} // Set up the event handler here
              style={{
                backgroundColor: isActive ? '#bee3f8' : '',
                color: isActive ? '#3182ce' : '',
                borderColor: isActive ? '#3182ce' : '',
              }}              
            >
              <div className="flex items-center gap-x-2 py-4">
                Module 2
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  opacity: isActive ? 100 : 0,
                  border: '2px solid sky-700',
                  height: '100%',
                  transition: 'all 0.3s',
                }}
              />
            </button>
          </Link>
        </div> 
        {/*  TODO: list all the activities*/}
        {/*{course.chapters.map((chapter) => (*/}
        {/*  <ProjectSidebarItem*/}
        {/*    key={chapter.id}*/}
        {/*    id={chapter.id}*/}
        {/*    label={chapter.title}*/}
        {/*    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}*/}
        {/*    courseId={course.id}*/}
        {/*    isLocked={!chapter.isFree && !purchase}*/}
        {/*  />*/}
        {/*))}*/}
        <Link href="/projects/1/create" className="mt-auto mb-4 self-center w-full">
            <Button className="w-40">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Module
            </Button>
        </Link>
      </div>
    </div>
  )
}