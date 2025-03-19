import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    ¿Olvidaste tu Contraseña?
                </h2>

                <div className="mb-4 text-sm text-gray-600">
                    ¿Olvidaste tu contraseña? No hay problema. Simplemente dinos tu dirección de correo electrónico y te enviaremos un enlace de restablecimiento de contraseña que te permitirá elegir una nueva.
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Correo Electrónico"
                    />

                    <InputError message={errors.email} className="mt-2 text-sm text-red-600" />

                    <div className="mt-6 flex items-center justify-end">
                        <PrimaryButton className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" disabled={processing}>
                            Enviar Enlace de Restablecimiento
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}