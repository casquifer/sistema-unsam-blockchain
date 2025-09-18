import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Notificador = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1>Gestión de Notificador</h1>
      <p>Envío masivo de correos.</p>
    </AppLayout>
  );
};

export default Notificador;
