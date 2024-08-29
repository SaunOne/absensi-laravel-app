
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import SelectBox from '@/Components/SelectBox';
import { useEffect, useState, useRef } from 'react';
import { Transition } from '@headlessui/react';


export default function SubmitAttendance() {
    const descriptionInput = useRef();
    const [showDescription, setShowDescription] = useState(false);
    const { data, setData, post, reset, errors, processing } = useForm({
        status: 'attend',
        description: '',
    });

    useEffect(() => {
        if (data.status === 'attend') {
            setShowDescription(false);
            setData('description', '');
        } else {
            setShowDescription(true);
        }
    }, [data.status]);

    const submit = (e) => {
        e.preventDefault();
        post(route('attendance.submit'), {
            preserveScroll: true,
            onSuccess: () => {
                alert('Attendance submitted successfully');
                reset();
            },
            onError: (errors) => {
                if (errors.description) {
                    descriptionInput.current.focus();
                }
            }
        });
    };

    return (

        <form onSubmit={submit} className="mt-6 space-y-6 max-w-xl">
            <div>
                <InputLabel htmlFor="info" value="Attendance" />

                <SelectBox
                    id="status"
                    currentValue={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    options={[
                        { value: 'attend', label: 'Attend' },
                        { value: 'sick', label: 'Sick' },
                        { value: 'leave', label: 'Leave' },
                        { value: 'permit', label: 'Permit' },
                        { value: 'bussiness_trip', label: 'Bussiness Trip' },
                        { value: 'remote', label: 'Remote' },
                    ]}
                />

                <InputError className="mt-2" message={errors.status} />
            </div>
            <Transition
                show={showDescription}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <div>
                    <InputLabel htmlFor="description" value="Description" />

                    <TextInput
                        id="description"
                        ref={descriptionInput}
                        type="text"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />

                    <InputError className="mt-2" message={errors.description} />
                </div>
            </Transition>


            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>
            </div>
        </form>
    );
}
