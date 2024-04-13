import React from 'react';
import {DataTable} from "@/app/(dashboard)/(routes)/users/_component/data-table";
import {columns} from "@/app/(dashboard)/(routes)/users/_component/columns";

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