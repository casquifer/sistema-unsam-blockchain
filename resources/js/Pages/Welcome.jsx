import { Link, useForm } from '@inertiajs/react';
import Footer from '@/Layouts/Footer';

export default function Welcome({ canLogin }) {
  const { post } = useForm({});

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <img src="/img/Logo_UNSAM_blanco.png" alt="Logo UNSAM" className="welcome-logo" />
        {canLogin && (
          <Link href="/login" className="login-btn">
            Iniciar Sesión
          </Link>
        )}
      </header>

      <main className="welcome-main">
        <h1 className="welcome-title">Intercambios Internacionales UNSAM</h1>
        <p className="welcome-text">
          Este sistema permite gestionar los procesos de intercambio académico internacional para
          alumnos extranjeros en la Universidad Nacional de San Martín. Desde aquí podés acceder al
          sistema de postulaciones, seguimiento de alumnos, convenios, certificados y más.
        </p>
      </main>
      <Footer />
    </div>
  );
}
