import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-900 font-sans min-h-screen flex flex-col">

                <main className="container mx-auto px-6 py-20 text-center flex-grow flex flex-col justify-center">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h1 className="text-6xl font-bold mb-6 text-indigo-800 leading-tight">
                                    ¡Estás logueado!
                                </h1>
                                <p className="text-xl mb-6 text-gray-700 leading-relaxed max-w-3xl mx-auto">
                                    Bienvenido a tu panel de control.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
                <footer className="text-center p-6 bg-gray-100 text-gray-700 mt-12 text-sm">
                    UNSAM Blockchain Dashboard
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}