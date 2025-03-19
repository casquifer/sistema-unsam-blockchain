import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                    Verificación de Correo Electrónico
                </h2>

                <div className="mb-4 text-sm text-gray-600">
                    ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar? Si no recibiste el correo electrónico, con gusto te enviaremos otro.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-6 flex items-center justify-between">
                        <PrimaryButton className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700" disabled={processing}>
                            Reenviar Correo de Verificación
                        </PrimaryButton>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-md text-sm text-indigo-600 underline hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cerrar Sesión
                        </Link>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}