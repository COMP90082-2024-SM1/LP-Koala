import { redirect } from "next/navigation";
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock } from "lucide-react";

// import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { ProjectsList } from "@/components/projects-list";

import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
    // const { userId } = auth();
    //
    // if (!userId) {
    //     return redirect("/");
    // }

    // const {
    //     completedCourses,
    //     coursesInProgress
    // } = await getDashboardCourses(userId);

    const items = [{
        id: '123',
        title: 'sad',
        imageUrl: '',
        chaptersLength: 2,
        price: 12,
        progress: 20,
        category: 'writing'
    },
        {
            id: '123',
            title: 'sad',
            imageUrl: '',
            chaptersLength: 2,
            price: 12,
            progress: 20,
            category: 'writing'
        }

    ]
    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard
                    icon={Clock}
                    label="In Progress"
                    numberOfItems={5}
                />
                <InfoCard
                    icon={CheckCircle}
                    label="Completed"
                    numberOfItems={5}
                    variant="success"
                />
                <Link href="/dashboard/create">
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Project
                    </Button>
                </Link>
            </div>
            <ProjectsList
                items={items}
            />
        </div>
    )
}
