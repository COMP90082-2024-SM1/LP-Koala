import {DataTable} from "@/app/(dashboard)/users/_component/data-table";
import {columns} from "@/app/(dashboard)/users/_component/columns";
import {cookies} from "next/headers";

async function Page() {

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
    return (
        <div className="p-6 space-y-4">
            <DataTable columns={columns} data={users} canCreateUser={true}/>
        </div>
    );
}

export default Page;