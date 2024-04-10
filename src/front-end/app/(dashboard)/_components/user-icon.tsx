import React from 'react';
import {CircleUserRound} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";






function UserIcon() {
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:outline-none'

            >
                <CircleUserRound className='mx-3' color='#1c407f' size={36} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='mx-4'>
                {/*TODO: /profile should be followed by a user id to show corresponding user*/}
                <DropdownMenuItem onClick={()=>router.push('/profile')}>
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Change Password
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default UserIcon;