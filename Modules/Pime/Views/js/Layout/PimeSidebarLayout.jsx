import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import Footer from '@/Layouts/Footer';

const AppLayout = ({ children }) => {
  const { url } = usePage();

  const esRutaActiva = (ruta) => url.startsWith(ruta);


  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <aside style={{ width: '220px', backgroundColor: '#4a86e8', color: 'white', padding: '1rem' }}>
        <br></br>
        <h2 className="titulo-sidebar">MODULO PIME</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <Link href="/pime/dashboard">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/dashboard') ? 'select' : ''}`}>Panel Principal</li>
          </Link>
          <Link href="/pime/universidades">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/universidades') ? 'select' : ''}`}>Universidades</li>
          </Link>
          <Link href="/pime/convenios">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/convenios') ? 'select' : ''}`}>Convenios</li>
          </Link>
          <Link href="/pime/carreras">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/carreras') ? 'select' : ''}`}>Carreras</li>
          </Link>
          <Link href="/pime/materias">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/materias') ? 'select' : ''}`}>Materias</li>
          </Link>
          <Link href="/pime/alumnos">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/alumnos') ? 'select' : ''}`}>Alumnos</li>
          </Link>
          <Link href="/pime/postulaciones">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/postulaciones') ? 'select' : ''}`}>Postulaciones</li>
          </Link>
          <Link href="/pime/certificados">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/certificados') ? 'select' : ''}`}>Certificados</li>
          </Link>
          <Link href="/pime/notificador">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/notificador') ? 'select' : ''}`}>Notificador</li>
          </Link>
          <Link href="/pime/reportes">
            <li className={`contenedor-sidebar-btn ${esRutaActiva('/pime/reportes') ? 'select' : ''}`}>Reportes</li>
          </Link>
        </ul>

      </aside>

      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
