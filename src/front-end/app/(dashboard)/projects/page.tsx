'use client';
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects-list";
import {useRouter} from "next/navigation";
import {getUserRole} from "@/lib/utils";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";


export default function Dashboard() {

    const router = useRouter();
    const [isRater, setIsRater] = useState(true)
    useEffect(() => {
        getUserRole(Cookies.get('token')).then(r=> setIsRater(r === 'rater'));
    }, []);
    return (
        <div className="p-6 space-y-4">

            {!isRater && (<Button onClick={()=>{router.push('/projects/create')}}>
                <PlusCircle className="h-4 w-4 mr-2" />
                New Project
            </Button>)}
            <ProjectsList
            />
        </div>
    )
}
