import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock } from "lucide-react";

import { ProjectsList } from "@/components/projects-list";

import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {

    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/projects/create">
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Project
                    </Button>
                </Link>
            </div>
            <ProjectsList
            />
        </div>
    )
}
