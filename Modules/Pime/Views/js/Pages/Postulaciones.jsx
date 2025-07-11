import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Postulaciones = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1>Gestión de Postulaciones</h1>
      <p>Lista, búsqueda y gestión de postulaciones.</p>
    </AppLayout>
  );
};

export default Postulaciones;
