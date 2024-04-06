// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from "lucide-react";
import {Sidebar} from "./_components/sidebar";
import {Navbar} from "./_components/navbar";
// import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { AttachmentForm } from "./_components/attachment-form";
import { ChaptersForm } from "./_components/activities-form";
import { Actions } from "./_components/actions";

const ProjectIdPage = async (
  {
    params
  }: {
    params: { courseId: string }
  }) => {
  //   const { userId } = auth();

  //   if (!userId) {
  //     return redirect("/");
  // }

  // const course = await db.course.findUnique({
  //   where: {
  //     id: 1,
  //     userId
  //   },
  //   include: {
  //     chapters: {
  //       orderBy: {
  //         position: "asc",
  //       },
  //     },
  //     attachments: {
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //     },
  //   },
  // });

  // if (!course) {
  //   return redirect("/");
  // }

  // const requiredFields = [
  //   course.title,
  //   course.description,
  //   course.imageUrl,
  //   course.price,
  //   course.categoryId,
  //   course.chapters.some(chapter => chapter.isPublished),
  // ];

  // const totalFields = requiredFields.length;
  // const completedFields = requiredFields.filter(Boolean).length;

  // const completionText = `(${completedFields}/${totalFields})`;
  const completionText = `(${5}/${6})`

  // const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {/* {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )} */}
      <div className="h-full">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
            <Navbar />
        </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">
                Course setup
              </h1>
              <span className="text-sm text-slate-700">
                Complete all fields {completionText}
              </span>
            </div>
            {/* <Actions
              disabled={!isComplete}
              courseId={params.courseId}
              isPublished={course.isPublished}
            /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your course
                </h2>
              </div>
              {/* <TitleForm
                // initialData={course}
                // courseId={course.id}
              /> */}
              {/* <DescriptionForm
                // initialData={course}
                courseId={"1"}
              /> */}
            </div>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={ListChecks} />
                  <h2 className="text-xl">
                    Course chapters
                  </h2>
                </div>
                {/* <ChaptersForm
                  initialData={course}
                  courseId={course.id}
                /> */}
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={CircleDollarSign} />
                  <h2 className="text-xl">
                    Sell your course
                  </h2>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={File} />
                  <h2 className="text-xl">
                    Resources & Attachments
                  </h2>
                </div>
                {/* <AttachmentForm
                  initialData={course}
                  courseId={course.id}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
   );
}
 
export default ProjectIdPage;