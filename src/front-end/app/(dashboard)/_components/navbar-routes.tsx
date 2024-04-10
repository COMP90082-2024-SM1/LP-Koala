"use client";

import { usePathname } from "next/navigation";
import {CircleUserRound, LogOut} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import UserIcon from "./user-icon";

// import { SearchInput } from "./search-input";

export const NavbarRoutes = () => {
  // const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";
  const isTeacher = (userId?: string | null) => {
    return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
  }
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          {/*<SearchInput />*/}
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher('userId') ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
        {/*TODO: the User should be replaced by the user name*/}
        <p className='my-auto'> Hi User!</p>
        <UserIcon/>
      </div>
    </>
  )
}