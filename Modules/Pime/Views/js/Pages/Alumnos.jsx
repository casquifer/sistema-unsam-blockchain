import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, Link } from '@inertiajs/react';

const Alumnos = () => {
  const { post } = useForm({});
  return (
    <AppLayout>
      <button style={{ float: 'right' }} onClick={() => post('/logout')}>Logout</button>
      <h1>Gestión de Alumnos</h1>
      <p>Lista, búsqueda y gestión de alumnos vinculados.</p>
      
      <div id="separador" style={{ height: '50px' }}></div>
      
      <h1>Ingresar Alumno</h1>
      <Link href="/pime/ingresar-alumnos">Ingresar</Link>

      <div id="separador" style={{ height: '50px' }}></div>
      
      <h1>Últimos Alumnos Ingresados</h1> 

    </AppLayout>
  );
};

export default Alumnos;
