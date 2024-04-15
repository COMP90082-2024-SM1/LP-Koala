import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/app/(dashboard)/_components/navbar-routes";

import { ProjectMobileSidebar } from "./project-mobile-sidebar";
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CourseNavbarProps {
  course?: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount?: number;
};

export const ProjectNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <ProjectMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <Link href="/projects">
        <Button style={{ width: '100px' }} className="mt-auto mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
        </Button>
      </Link>
      <NavbarRoutes />      
    </div>
  )
}