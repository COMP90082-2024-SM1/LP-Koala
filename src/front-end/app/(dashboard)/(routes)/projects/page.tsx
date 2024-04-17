'use client';
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects-list";
import {useRouter} from "next/navigation";


export default function Dashboard() {

    const router = useRouter();
    return (
        <div className="p-6 space-y-4">

            <Button onClick={()=>{router.push('/projects/create')}}>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Project
            </Button>
            <ProjectsList
            />
        </div>
    )
}
