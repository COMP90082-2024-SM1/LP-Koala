'use client';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
export function ProfileForm () {

    const user = JSON.parse(Cookies.get('user')!);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedRole, setEditedRole] = useState(user.role);
    const router = useRouter()
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        user.name = editedName;
        user.role = editedRole;
        
        Cookies.set('user', JSON.stringify(user));
        location.reload();
    };
    
    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-5">Profile</h1>

            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                    {isEditing ? <input className="shadow appearance-none border rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} /> : <p className="text-gray-700">{user.name}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
                    <p className="text-gray-700">{user.username}</p>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                    <p className="text-gray-700">{user.role}</p>
                </div>
                <div className="flex items-center justify-between">
                    {isEditing ? (
                        <button className="bg-[#1c407f] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSaveClick}>Save</button>
                    ) : (
                        <button className="bg-[#1c407f] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleEditClick}>Edit Profile</button>
                    )}
                </div>
            </div>
        </div>
    );
}




