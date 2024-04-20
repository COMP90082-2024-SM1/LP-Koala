"use client";

import { useState } from "react";

function Page() {
    const [selectedProjects, setSelectedProjects] = useState<string[]>([]);

    const handleProjectSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedProjects(selectedOptions);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 ">Add User</h2>
            <form className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-6 py-8 bg-white shadow-md rounded-lg">
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-800">
                        Name
                    </label>
                    <input type="text" id="name" name="name" className="form-input mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm pl-2" />
                </div>
                <div className="mb-6">
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-800">
                        User Name
                    </label>
                    <input type="text" id="username" name="username" className="form-input mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm pl-2" />
                </div>
                <div className="mb-6">
                    <label htmlFor="role" className="block text-sm font-medium leading-6 text-gray-800">
                        Role
                    </label>
                    <select id="role" name="role" className="form-select mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm pl-1">
                        <option value="admin">Admin</option>
                        <option value="researcher">Researcher</option>
                        <option value="rater">Rater</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-800">
                        Password
                    </label>
                    <input type="password" id="password" name="password" className="form-input mt-1 block w-full h-8 border-gray-300 rounded-md shadow-sm pl-2" />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium leading-6 text-gray-800 mb-1">
                        Allocate Project
                    </label>
                    <div className="overflow-auto h-32 border border-gray-300 rounded-md shadow-sm">
                        {["Project 1", "Project 2", "Project 3", "Project 4", "Project 5"].map((project: string) => (
                            <label key={project} className="block px-4 py-2">
                                <input
                                    type="checkbox"
                                    value={project}
                                    checked={selectedProjects.includes(project)}
                                    onChange={(event) => {
                                        const checked = event.target.checked;
                                        setSelectedProjects((prev: string[]) => {
                                            if (checked) return [...prev, project];
                                            return prev.filter(p => p !== project);
                                        });
                                    }}
                                    className="mr-2"
                                />
                                {project}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit" className="bg-[#1c407f] text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Page;
