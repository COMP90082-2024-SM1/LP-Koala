import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects-list";
import {redirect} from "next/navigation";


interface ProjectProps  {
    params: {projectId: string}
}

function Page({params}:ProjectProps) {
    return redirect(`/projects/${params.projectId}/modules/module1`)
}

export default Page;