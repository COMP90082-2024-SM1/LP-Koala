import {DataTable} from "@/app/(dashboard)/(routes)/users/_component/data-table";
import {columns} from "@/app/(dashboard)/(routes)/users/_component/columns";
import Cookies from "js-cookie";
import {cookies} from "next/headers";

async function Page() {

    // const users = [
    //     {
    //         name: 'user1',
    //         projects: ['project1', 'project2'],
    //         role: 'Researcher'
    //
    // },{
    //         name: 'user1',
    //         projects: ['project1', 'project2'],
    //         role: 'Researcher'
    // }]
    const token = cookies().get('token')?.value
    const response = await fetch('http://localhost:3000/users/getUsers', {
        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": token!
        }
    })

    const responseObject = await response.json()
    const users = responseObject.data.users
    console.log(users)
    return (
        <div className="p-6 space-y-4">
            <DataTable columns={columns} data={users}/>
        </div>
    );
}

export default Page;