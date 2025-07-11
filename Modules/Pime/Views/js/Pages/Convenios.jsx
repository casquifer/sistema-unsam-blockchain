import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Convenios = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button style={{ float: 'right' }} onClick={() => post('/logout')}>Logout</button>
      <h1>Gestión de Convenios</h1>
      <p>Lista, búsqueda y gestión de convenios con universidades socias.</p>
    </AppLayout>
  );
};

export default Convenios;
