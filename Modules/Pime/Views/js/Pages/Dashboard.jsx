import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm } from '@inertiajs/react';

const Dashboard = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button style={{ float: 'right' }} onClick={() => post('/logout')}>Logout</button>
      <h1>Dashboard</h1>
      <p>Bienvenido al panel principal.</p>
    </AppLayout>
  );
};

export default Dashboard;
