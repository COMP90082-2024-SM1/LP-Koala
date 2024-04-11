import React from 'react';
import {DataTable} from "@/app/(dashboard)/users/_component/data-table";
import {columns} from "@/app/(dashboard)/users/_component/columns";

function Page() {

    const users = [
        {
            name: 'user1',
            projects: ['project1', 'project2'],
            role: 'Researcher'

    },{
            name: 'user1',
            projects: ['project1', 'project2'],
            role: 'Researcher'
    }]
    return (
        <div>
            <DataTable columns={columns} data={users}/>
        </div>
    );
}

export default Page;