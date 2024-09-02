import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectBox from '@/Components/SelectBox';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';


export default function Create({ auth }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const { data, setData, post, errors, processing, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user',
        uid: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('users.store'));
    };

    window.Echo.channel('read-rfid-channel').listen('ReadRfidEvent', (e) => {
        if (e.code === 'EXIST') {
            errors.uid = e.message;
            reset('uid');
        } else {
            errors.uid = '';
            setData('uid', e.uid);
        }
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User</h2>}
        >
            <Head title="Create User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Create User</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create a new user.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="uid" value="RFID" />

                                    <TextInput
                                        id="uid"
                                        className="mt-1 block w-full"
                                        value={data.uid}
                                        onChange={(e) => setData('uid', e.target.value)}
                                        isFocused
                                        readOnly
                                    />

                                    <InputError className="mt-2" message={errors.uid} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        isFocused
                                        autoComplete="name"
                                    />

                                    <InputError className="mt-2" message={errors.name} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="username"
                                    />

                                    <InputError className="mt-2" message={errors.email} />
                                </div>
                                <div>
                                    <InputLabel htmlFor="role" value="Role" />

                                    <SelectBox
                                        id="role"
                                        currentValue={data.role}
                                        onChange={(e) => setData('role', e.target.value)}

                                        options={[
                                            { value: 'user', label: 'User' },
                                            { value: 'admin', label: 'Admin' },
                                        ]}
                                    />

                                    <InputError className="mt-2" message={errors.role} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password" value="New Password" />

                                    <div className="relative">
                                        <TextInput
                                            id="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            type={showPassword ? 'text' : 'password'}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                                    <div className="relative">
                                        <TextInput
                                            id="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            type={showPasswordConfirmation ? 'text' : 'password'}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        >
                                            {showPasswordConfirmation ? (
                                                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                            ) : (
                                                <EyeIcon className="h-5 w-5 text-gray-500" />
                                            )}
                                        </button>
                                    </div>

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
