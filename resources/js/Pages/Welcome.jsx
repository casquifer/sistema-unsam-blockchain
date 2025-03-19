import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
  return (
    <>
      <Head title="Unsam Blockchain" />
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 text-gray-900 font-sans min-h-screen flex flex-col">
        <header className="flex justify-between items-center p-6 bg-white shadow-md">
          <div className="flex items-center space-x-8">
            <nav className="space-x-6 text-lg font-medium">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Soluciones</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition">Equipo</a>
              <a href="#" className="text-gray-700 hover:text-yellow-600 transition">Blog</a>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-gray-600">ES</span>
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="px-5 py-2 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('register')}
                  className="px-5 py-2 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 transition"
                >
                  Registrarse
                </Link>
                <Link
                  href={route('login')}
                  className="px-5 py-2 border border-gray-400 rounded-full shadow-md hover:bg-gray-100 transition"
                >
                  Ingresar
                </Link>
                <a
                  href="#"
                  className="px-5 py-2 border border-blue-500 text-blue-500 rounded-full shadow-md hover:bg-blue-100 transition"
                >
                  Agendar demo
                </a>
              </>
            )}
          </div>
        </header>

        <main className="container mx-auto px-6 py-20 text-center flex-grow flex flex-col justify-center">
          <h1 className="text-6xl font-bold mb-6 text-indigo-800 leading-tight">
            Emisión de Certificados Digitales en Blockchain
          </h1>
          <p className="text-xl mb-6 text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Crea y emite certificados digitales verificables de forma segura,
            transparente y descentralizada con tecnología blockchain.
          </p>
          <p className="text-xl mb-10 text-gray-700 leading-relaxed max-w-3xl mx-auto">
          La UNSAM garantiza la autenticidad de diplomas, certificaciones y 
          credenciales académicas y profesionales mediante tecnología blockchain.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-700 transition"
            >
              Agendar demo
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-gray-400 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              Ver ejemplo
            </a>
          </div>
        </main>

        <footer className="text-center p-6 bg-gray-100 text-gray-700 mt-12 text-sm">
          Laravel v{laravelVersion} (PHP v{phpVersion})
        </footer>
      </div>
    </>
  );
}