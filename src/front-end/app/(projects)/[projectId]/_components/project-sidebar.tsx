import { redirect } from "next/navigation";


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
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {project.title}
        </h1>

          <div className="mt-10">
            <ProjectProgress
              variant="success"
              value={progressCount}
            />
          </div>

      </div>
      <div className="flex flex-col w-full">

          this is sidebar for activities
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
      </div>
    </div>
  )
}