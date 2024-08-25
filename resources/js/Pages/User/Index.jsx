import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableUsers from '@/Components/Users/TableUsers';
import Pagination from '@/Components/Pagination';
export default function UserIndex({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <TableUsers users={users} />
                        <Pagination links={users.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
