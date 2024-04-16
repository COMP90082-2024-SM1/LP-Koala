import React from 'react';
import {useParams} from "next/navigation";

const Page = ({params}:{params:{userId: string}}) => {
    return (
        <div>
            this is user {params.userId}
        </div>
    );
};

export default Page;