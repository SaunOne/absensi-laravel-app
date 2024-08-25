import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableUsers from '@/Components/Users/TableUsers';
import Pagination from '@/Components/Pagination';
import { Link } from '@inertiajs/react';
export default function UserIndex({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='p-2 flex'>
                        <label className='text-lg font-semibold'>Total Users : {users.total}</label>
                        <Link href={route('users.create')} className='ml-auto bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded'>
                            Create User
                        </Link>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                        </div>
                        <TableUsers users={users} />
                        <Pagination links={users.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
