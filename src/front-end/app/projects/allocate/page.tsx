import React from 'react';
import {DataTable} from "@/app/projects/allocate/_component/data-table";
import {columns} from "@/app/projects/allocate/_component/columns";

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
        <div className="p-6 space-y-4">
            <DataTable columns={columns} data={users}/>
        </div>
    );
}

export default Page;