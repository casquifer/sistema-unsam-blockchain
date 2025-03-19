import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Confirmar Contraseña
                </h2>

                <div className="mb-4 text-sm text-gray-600">
                    Esta es un área segura de la aplicación. Por favor, confirma tu contraseña antes de continuar.
                </div>

                <form onSubmit={submit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Contraseña"
                        />
                        <InputError message={errors.password} className="mt-2 text-sm text-red-600" />
                    </div>

                    <div className="mt-6 flex items-center justify-end">
                        <PrimaryButton className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" disabled={processing}>
                            Confirmar
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}