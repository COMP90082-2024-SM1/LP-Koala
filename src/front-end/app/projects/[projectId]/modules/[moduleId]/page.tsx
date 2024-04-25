'use client';
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects-list";
import {useRouter} from "next/navigation";



function Page({params}:{params:{projectId: string, moduleId: string}}) {

    const router = useRouter();
    const {projectId, moduleId} = params;
    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button className='w-48' onClick={()=>router.push(`/projects/${projectId}/modules/${moduleId}/activities/create`)}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Activity
                    </Button>
            </div>
            {/*<ProjectsList*/}
            {/*/>*/}
        </div>
    );
}

export default Page;