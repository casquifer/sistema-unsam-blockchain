import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-900 font-sans min-h-screen flex flex-col">
                <main className="container mx-auto px-6 py-20 text-center flex-grow flex flex-col justify-center">
                    <div className="mx-auto max-w-md sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h1 className="text-4xl font-bold mb-6 text-indigo-800 leading-tight">
                                    Iniciar Sesión
                                </h1>

                                {status && (
                                    <div className="mb-4 text-sm font-medium text-green-600">
                                        {status}
                                    </div>
                                )}

                                <form onSubmit={submit} className="mt-6">
                                    <div>
                                        <InputLabel htmlFor="email" value="Email" />
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="password" value="Contraseña" />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <InputError message={errors.password} className="mt-2" />
                                    </div>

                                    <div className="mt-4 block">
                                        <label className="flex items-center">
                                            <Checkbox
                                                name="remember"
                                                checked={data.remember}
                                                onChange={(e) => setData('remember', e.target.checked)}
                                            />
                                            <span className="ms-2 text-sm text-gray-600">
                                                Recordarme
                                            </span>
                                        </label>
                                    </div>

                                    <div className="mt-4 flex items-center justify-end">
                                        {canResetPassword && (
                                            <Link
                                                href={route('password.request')}
                                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            >
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}

                                        <PrimaryButton className="ms-4" disabled={processing}>
                                            Iniciar Sesión
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="text-center p-6 bg-gray-100 text-gray-700 mt-12 text-sm">
                    UNSAM Blockchain Login
                </footer>
            </div>
        </GuestLayout>
    );
}