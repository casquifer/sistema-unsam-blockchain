import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Certificados = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1>Gestión de Certificados</h1>
      <p>Lista, búsqueda y gestión de certificados.</p>
    </AppLayout>
  );
};

export default Certificados;
