
import AddUserForm from "@/app/(dashboard)/users/_component/add-user-form";
import {cookies} from "next/headers";
import {Project} from "@/type";

async function Page() {

    const token = cookies().get('token')?.value
    const response = await fetch('http://localhost:3000/projects', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token!
        }
    })

    const responseObject = await response.json();
    const projects = responseObject.data as Project [];

    return (
        <AddUserForm projects={projects}/>

    )

}

export default Page;
