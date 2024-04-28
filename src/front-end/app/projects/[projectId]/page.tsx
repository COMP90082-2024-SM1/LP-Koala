import {redirect} from "next/navigation";
import {cookies} from "next/headers";


interface ProjectProps  {
    params: {projectId: string}
}

async function Page({params}:ProjectProps) {
    const token = cookies().get('token')?.value

    const response = await fetch(`http://localhost:3000/projects/${params.projectId}`, {
            method: "GET",
            headers: {
                "Authorization": token!
            }
        });
    const {data: {data}} = await response.json();

    if (!data){
        redirect('/projects')
    }

    redirect(`/projects/${params.projectId}/modules/${data.modules[0]._id}`)
<<<<<<< HEAD
=======

>>>>>>> 8f2497180b3bb1136da17be5ff23bc0af17273c8
}

export default Page;