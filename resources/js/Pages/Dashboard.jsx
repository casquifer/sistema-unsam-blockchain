import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    const certificadosRecientes = [
        { id: 1, nombre: 'Curso Blockchain', destinatario: 'Juan Perez', fecha: '2023-10-27' },
        { id: 2, nombre: 'Taller SmartContracts', destinatario: 'Maria Garcia', fecha: '2023-10-26' },
    ];

    const estadisticas = {
        certificadosEmitidos: 120,
        pendientesVerificacion: 15,
        usuariosRegistrados: 50,
    };

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
                <main className="container mx-auto px-6 py-20 flex-grow">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                            <h1 className="text-4xl font-bold mb-6 text-indigo-800 leading-tight text-center">
                                ¡Bienvenido, {auth.user.name}!
                            </h1>
                            <p className="text-xl mb-6 text-gray-700 leading-relaxed max-w-3xl mx-auto text-center">
                                Tu panel de control para la gestión de certificados blockchain.
                            </p>

                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-semibold">Certificados Emitidos</h3>
                                    <p className="text-4xl text-center">{estadisticas.certificadosEmitidos}</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-semibold">Pendientes Verificación</h3>
                                    <p className="text-4xl text-center">{estadisticas.pendientesVerificacion}</p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-4">
                                    <h3 className="font-semibold">Usuarios</h3>
                                    <p className="text-4xl text-center">{estadisticas.usuariosRegistrados}</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold mb-4">Certificados Recientes</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {certificadosRecientes.map((certificado) => (
                                        <div key={certificado.id} className="bg-white rounded-lg shadow p-4">
                                            <h3 className="font-semibold">{certificado.nombre}</h3>
                                            <p>Destinatario: {certificado.destinatario}</p>
                                            <p>Fecha: {certificado.fecha}</p>
                                            <Link href={`/certificado/${certificado.id}`} className="mt-2 text-indigo-600 hover:text-indigo-800">Ver Detalles</Link>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <Link href="/emitir-certificado" className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 mr-4">
                                    Emitir Nuevo Certificado
                                </Link>
                                <Link href="/verificar-certificado" className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                                    Verificar Certificado
                                </Link>
                                <Link href="/plantillas" className="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 ml-4">
                                    Gestionar Plantillas
                                </Link>
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