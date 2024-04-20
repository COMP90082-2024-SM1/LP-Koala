import React from 'react';
import {DataTable} from "@/app/(dashboard)/(routes)/projects/create/_component/data-table";
import {columns} from "@/app/(dashboard)/(routes)/projects/create/_component/columns";

const Allocation = ({ isOpen, onClose, onConfirm }: {isOpen: boolean, onClose: React.MouseEventHandler<HTMLButtonElement>, onConfirm: React.MouseEventHandler<HTMLButtonElement>}) => {
    if (!isOpen) return null;
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
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        }}>
            <div style={{
                padding: 20,
                background: 'white',
                borderRadius: 5,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '50%', // or use a fixed width like 600px
                minHeight: '300px', // Ensures the modal is not too small
                maxWidth: '80%', // Ensures the modal does not get too wide on large screens
                overflow: 'auto' // Adds scroll if content is too long
            }}>
                <h2>Allocate User</h2>
                <DataTable columns={columns} data={users}/>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between', // This spaces the buttons apart
                }}>
                    <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                    <button style={{backgroundColor: '#121212',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'background-color 300ms'
                    }} onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default Allocation;