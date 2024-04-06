// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {Sidebar} from "./_components/sidebar";
import {Navbar} from "./_components/navbar";

// import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/");
//   }

//   const courses = await db.course.findMany({
//     where: {
//       userId,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

  return ( 
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        <div className="p-6">
          {/* <DataTable columns={columns} data={courses} /> */}
          <h1>Hello</h1>
        </div>
      </main>
    </div>
   );
}
 
export default CoursesPage;