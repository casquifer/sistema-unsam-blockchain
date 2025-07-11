import React, {useEffect, useState} from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, Link } from '@inertiajs/react';

const Alumnos = () => {
  //Logout
  const { post } = useForm({});

  //Cargar ultimos alumnos
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    fetch('/pime/ultimos-alumnos')
      .then((response) => {
        if (!response.ok) {
          alert('Error al obtener los alumnos');
        }
        return response.json();
      })
      .then((data) => setAlumnos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1>Gestión de Alumnos</h1>
      <p>Lista, búsqueda y gestión de alumnos vinculados.</p>
      
      <div id="separador" style={{ height: '50px' }}></div>
      
      <h1>Ingresar Alumno</h1>
      <Link class="ingresar-alumno-btn" href="/pime/ingresar-alumnos">Ingresar</Link>

      <div id="separador" style={{ height: '50px' }}></div>
      
      <h1>Últimos Alumnos Ingresados</h1>

      <table className="table">
      <thead>
        <tr>
          <th>Nombre y Apellido</th>
          <th>Correo</th>
          <th>Universidad</th>
          <th>Fecha Inicio Estudios</th>
          <th>Estado Postulación</th>
        </tr>
      </thead>

      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.id}>
            <td>{alumno.nombre} {alumno.apellido}</td>
            <td>{alumno.correo}</td>
            <td>{alumno.universidad}</td>
            <td>{alumno.fecha_inicio_estudios}</td>
            <td>{alumno.estado_postulacion}</td>
          </tr>
        ))}
      </tbody>
    </table>  
      
    </AppLayout>
  );
};

export default Alumnos;
