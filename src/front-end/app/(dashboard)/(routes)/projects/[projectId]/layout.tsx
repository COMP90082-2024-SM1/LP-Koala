import { redirect } from "next/navigation";
import {ProjectNavbar} from "./_components/project-navbar";
import {ProjectSidebar} from "./_components/project-sidebar";



const ProjectLayout =  ({
                              children,
                              params
                            }: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {


  return (
      <div className="h-full">
        <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
          <ProjectNavbar
              // course={course}
              // progressCount={progressCount}
          />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
          <ProjectSidebar
              // course={course}
              // progressCount={progressCount}
          />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">
          {children}
        </main>
      </div>
  )
}

export default ProjectLayout