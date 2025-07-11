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
          <th class="titulo-tabla-alumnos">Nombre y Apellido</th>
          <th class="titulo-tabla-alumnos">Correo</th>
          <th class="titulo-tabla-alumnos">Universidad</th>
          <th class="titulo-tabla-alumnos">Fecha Inicio Estudios</th>
          <th class="titulo-tabla-alumnos">Estado Postulación</th>
          <th class="titulo-tabla-alumnos">Perfil</th>
        </tr>
      </thead>

      <tbody>
        {alumnos.map((alumno) => (
          <tr key={alumno.id}>
            <td class="fila-tabla-alumno">{alumno.nombre} {alumno.apellido}</td>
            <td class="fila-tabla-alumno text-center">{alumno.correo}</td>
            <td class="fila-tabla-alumno text-center">{alumno.universidad}</td>
            <td class="fila-tabla-alumno text-center">{alumno.fecha_inicio_estudios}</td>
            <td class="fila-tabla-alumno text-center">{alumno.estado_postulacion}</td>
            <td class="fila-tabla-alumno text-center"><Link href={`/pime/perfil-alumnos/${alumno.id}`}>Ver</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>  
      
    </AppLayout>
  );
};

export default Alumnos;
