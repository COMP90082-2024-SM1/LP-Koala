'use client';

import {Button} from "@/components/ui/button";
const onClick = ()=>{

}
const ChangePasswordForm = () => {
    return (
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col flex-1 justify-center min-h-full">
            <form className="space-y-6" onSubmit={onClick} action="#" method="POST">
                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Current Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                    </div>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className='flex space-x-3'>
                    <Button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Clear
                    </Button>
                    <Button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-[#1c407f] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Confirm
                    </Button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                Issues?{' '}
                <a href="#" className="font-semibold leading-6 hover:text-blue-600">
                    Email us on <span className='text-[#1c407f]'>dlassp@unimelb.edu.au</span>
                </a>
            </p>
        </div>

    );
};

export default ChangePasswordForm;