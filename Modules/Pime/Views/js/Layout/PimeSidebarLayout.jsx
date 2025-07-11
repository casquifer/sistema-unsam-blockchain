import React from 'react';
import { Link } from '@inertiajs/react';

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <aside style={{ width: '220px', backgroundColor: '#4a86e8', color: 'white', padding: '1rem' }}>
        <h2>Menú:</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link href="/pime/dashboard" style={{ color: 'white' }}>Dashboard</Link></li>
          <li><Link href="/pime/alumnos" style={{ color: 'white' }}>Alumnos</Link></li>
          <li><Link href="/pime/universidades" style={{ color: 'white' }}>Universidades</Link></li>
          <li><Link href="/pime/convenios" style={{ color: 'white' }}>Convenios</Link></li>
          <li><Link href="/pime/postulaciones" style={{ color: 'white' }}>Postulaciones</Link></li>
          <li><Link href="/pime/certificados" style={{ color: 'white' }}>Certificados</Link></li>
          <li><Link href="/pime/notificador" style={{ color: 'white' }}>Notificador</Link></li>
          <li><Link href="/pime/reportes" style={{ color: 'white' }}>Reportes</Link></li>
        </ul>
      </aside>

      <main style={{ flex: 1, padding: '2rem', backgroundColor: '#f5f5f5' }}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
