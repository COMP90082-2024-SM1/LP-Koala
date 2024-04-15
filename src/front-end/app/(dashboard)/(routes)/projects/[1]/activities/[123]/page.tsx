// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import {Sidebar} from "./_components/sidebar";
import {Navbar} from "./_components/navbar";

// import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

// import { ActivityTitleForm } from "./_components/activity-title-form";
// import { ActivityDescriptionForm } from "./_components/activity-description-form";
// import { ActivityAccessForm } from "./_components/activity-access-form";
// import { ActivityVideoForm } from "./_components/activity-video-form";
// import { ActivityActions } from "./_components/activity-actions";

const ActivityIdPage = async ({
  params
}: {
  params: { projectId: string; activityId: string }
}) => {
  // const { userId } = auth();

  // if (!userId) {
  //   return redirect("/");
  // }

  // const chapter = await db.chapter.findUnique({
  //   where: {
  //     id: params.activityId,
  //     courseId: params.projectId
  //   },
  //   include: {
  //     muxData: true,
  //   },
  // });

  // if (!chapter) {
  //   return redirect("/")
  // }

  // const requiredFields = [
  //   chapter.title,
  //   chapter.description,
  //   chapter.videoUrl,
  // ];

  // const totalFields = requiredFields.length;
  // const completedFields = requiredFields.filter(Boolean).length;

  // const completionText = `(${completedFields}/${totalFields})`;
  const completionText = `(${1}/${3})`;

  // const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {/* {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
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
            <div className="w-full">
              <Link
                href={`/teacher/courses/${params.projectId}`}
                className="flex items-center text-sm hover:opacity-75 transition mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to project setup
              </Link>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-y-2">
                  <h1 className="text-2xl font-medium">
                    Activity Creation
                  </h1>
                  <span className="text-sm text-slate-700">
                    Complete all fields {completionText}
                  </span>
                </div>
                {/* <ActivityActions
                  disabled={!isComplete}
                  courseId={params.projectId}
                  chapterId={params.activityId}
                  isPublished={chapter.isPublished}
                /> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={LayoutDashboard} />
                  <h2 className="text-xl">
                    Customize your activity
                  </h2>
                </div>
                {/* <ActivityTitleForm
                  initialData={chapter}
                  courseId={params.projectId}
                  chapterId={params.activityId}
                />
                <ActivityDescriptionForm
                  initialData={chapter}
                  courseId={params.projectId}
                  chapterId={params.activityId}
                /> */}
              </div>
              <div>
                <div className="flex items-center gap-x-2">
                  <IconBadge icon={Eye} />
                  <h2 className="text-xl">
                    Access Settings
                  </h2>
                </div>
                {/* <ActivityAccessForm
                  initialData={chapter}
                  courseId={params.projectId}
                  chapterId={params.activityId}
                /> */}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Video} />
                <h2 className="text-xl">
                  Add a video
                </h2>
              </div>
              {/* <ActivityVideoForm
                initialData={chapter}
                chapterId={params.projectId}
                courseId={params.activityId}
              /> */}
            </div>
          </div>
          </div>
        </main>
      </div>
    </>
   );
}
 
export default ActivityIdPage;