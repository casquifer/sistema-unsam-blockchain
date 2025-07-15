import React from 'react';
import { Link } from '@inertiajs/react';

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <aside style={{ width: '220px', backgroundColor: '#4a86e8', color: 'white', padding: '1rem' }}>
        <h2>Menú:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link href="/pime/dashboard" class="sidebar-btn">Dashboard</Link></li>
          <li><Link href="/pime/alumnos" class="sidebar-btn">Alumnos</Link></li>
          <li><Link href="/pime/universidades" class="sidebar-btn">Universidades</Link></li>
          <li><Link href="/pime/materias" class="sidebar-btn">Materias</Link></li>
          <li><Link href="/pime/convenios" class="sidebar-btn">Convenios</Link></li>
          <li><Link href="/pime/postulaciones" class="sidebar-btn">Postulaciones</Link></li>
          <li><Link href="/pime/certificados" class="sidebar-btn">Certificados</Link></li>
          <li><Link href="/pime/notificador" class="sidebar-btn">Notificador</Link></li>
          <li><Link href="/pime/reportes" class="sidebar-btn">Reportes</Link></li>
        </ul>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
