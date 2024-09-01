import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TableAttendance from '@/Components/Attendance/TableAttendance';
import Pagination from '@/Components/Pagination';
export default function AttendanceIndex({ auth, attendances }) {
    return (
        <AuthenticatedLayout
            user={auth.user}

            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Attendances</h2>}
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='p-2 flex'>
                        <label className='text-lg font-semibold'>Total : {attendances.total}</label>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                        </div>
                        <TableAttendance attendances={attendances} />
                        <Pagination links={attendances.links} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
