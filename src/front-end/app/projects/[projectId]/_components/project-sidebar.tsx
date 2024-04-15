import { redirect } from "next/navigation";
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {Logo} from "./logo";
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
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm w-full">
      <div className="p-6">
        <Logo />
      </div>
      <div className="flex flex-col w-full">
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
        <Link href="/projects/1/create" className="mt-auto">
            <Button className="w-40 mb-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Module
            </Button>
        </Link>
      </div>
    </div>
  )
}