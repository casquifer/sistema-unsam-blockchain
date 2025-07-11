import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Reportes = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button style={{ float: 'right' }} onClick={() => post('/logout')}>Logout</button>
      <h1>Gestión de Reportes</h1>
      <p>Reportes de alumnos, universidades, convenios, etc.</p>
    </AppLayout>
  );
};

export default Reportes;
