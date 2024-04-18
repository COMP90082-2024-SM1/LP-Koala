import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectsList } from "@/components/projects-list";



function Page() {
    return (
        <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/projects/661a8acb802cb862e77a7343/modules/1/activities/123/create">
                    <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Activity
                    </Button>
                </Link>
            </div>
            <ProjectsList
            />
        </div>
    );
}

export default Page;