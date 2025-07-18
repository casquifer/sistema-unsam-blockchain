import React from 'react';
import { Link } from '@inertiajs/react';
import Footer from '@/Layouts/Footer';

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <aside style={{ width: '220px', backgroundColor: '#4a86e8', color: 'white', padding: '1rem' }}>
        <br></br>
        <h2 class="titulo-sidebar">MODULO PIME</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <Link href="/pime/dashboard"><li class="contenedor-sidebar-btn">Panel Principal</li></Link>
          <Link href="/pime/alumnos"><li class="contenedor-sidebar-btn">Alumnos</li></Link>
          <Link href="/pime/universidades"><li class="contenedor-sidebar-btn">Universidades</li></Link>
          <Link href="/pime/carreras" ><li class="contenedor-sidebar-btn">Carreras</li></Link>
          <Link href="/pime/materias" ><li class="contenedor-sidebar-btn">Materias</li></Link>
          <Link href="/pime/convenios"><li class="contenedor-sidebar-btn">Convenios</li></Link>
          <Link href="/pime/postulaciones" ><li class="contenedor-sidebar-btn">Postulaciones</li></Link>
          <Link href="/pime/certificados" ><li class="contenedor-sidebar-btn">Certificados</li></Link>
          <Link href="/pime/notificador" ><li class="contenedor-sidebar-btn">Notificador</li></Link>
          <Link href="/pime/reportes" ><li class="contenedor-sidebar-btn">Reportes</li></Link>
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
