import { redirect } from "next/navigation";
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectSidebarItem } from "./project-sidebar-item";
import {ProjectProgress} from "./project-progress";

// interface CourseSidebarProps {
//   course: Course & {
//     chapters: (Chapter & {
//       userProgress: UserProgress[] | null;
//     })[]
//   };
//   progressCount: number;
// };



export const ProjectSidebar =  ({
  // course ,
  progressCount,
}:{course?:any, progressCount?:number}) => {


    const project = {title:'nihao'}
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col">
        <h1 className="font-semibold">
          {project.title}
        </h1>
      </div>
      <div className="flex flex-col flex-grow relative">
        <div className="flex-grow">
          this is sidebar for modules
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
        <Link href="/projects/1/create">
            <Button className="w-40 mt-auto mb-4"> {/* Adjust mb-4 to increase or decrease the space from the bottom */}
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Module
            </Button>
        </Link>
      </div>
    </div>
  )
}