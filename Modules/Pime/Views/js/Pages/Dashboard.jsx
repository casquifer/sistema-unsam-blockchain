import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Dashboard = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 class="titulos">Panel Principal</h1>
      <div class="linea-titulos"></div>
      <p>Bienvenido al panel principal.</p>
    </AppLayout>
  );
};

export default Dashboard;
