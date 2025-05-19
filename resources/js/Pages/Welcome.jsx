import { Link, useForm } from '@inertiajs/react';

export default function Welcome({ canLogin }) {
    const { post } = useForm({});
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Bienvenido al sistema</h1>

            {canLogin && (
                <Link
                    href="/login"
                    className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Iniciar sesión
                </Link>
            )}
            
            <button onClick={() => post('/logout')}>Cerrar sesión</button>
        </div>
    );
}
