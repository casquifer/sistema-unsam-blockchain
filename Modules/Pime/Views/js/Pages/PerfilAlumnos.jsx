import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

const PerfilAlumno = () => {
  const { alumno } = usePage().props;

  const { data, setData, patch, processing, errors } = useForm({
    nombre: alumno.nombre || '',
    apellido: alumno.apellido || '',
    correo: alumno.correo || '',
    universidad: alumno.universidad || '',
    fecha_inicio_estudios: alumno.fecha_inicio_estudios || '',
    estado_postulacion: alumno.estado_postulacion || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/pime/borrar-perfil-alumnos/${alumno.id}`, {
      onSuccess: () => {
        alert('Modificación realizada con éxito.');
      },
    });
  };

  return (
    <AppLayout>
      <h1>Editar Perfil del Alumno</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label><br />
          <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
          {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
        </div>

        <div>
          <label>Apellido</label><br />
          <input value={data.apellido} onChange={e => setData('apellido', e.target.value)} />
          {errors.apellido && <div style={{ color: 'red' }}>{errors.apellido}</div>}
        </div>

        <div>
          <label>Correo</label><br />
          <input type="email" value={data.correo} onChange={e => setData('correo', e.target.value)} />
          {errors.correo && <div style={{ color: 'red' }}>{errors.correo}</div>}
        </div>

        <div>
          <label>Universidad</label><br />
          <input value={data.universidad} onChange={e => setData('universidad', e.target.value)} />
        </div>

        <div>
          <label>Fecha de Inicio de Estudios</label><br />
          <input type="date" value={data.fecha_inicio_estudios} onChange={e => setData('fecha_inicio_estudios', e.target.value)} />
        </div>

        <div>
          <label>Estado de Postulación</label><br />
          <input value={data.estado_postulacion} onChange={e => setData('estado_postulacion', e.target.value)} />
        </div>

        <br />
        <button type="submit" disabled={processing}
        style={{
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '10px',
          float:'left'
        }}
        >Guardar cambios</button>
        <br />
        <button
          type="button"
          onClick={() => {
            if (confirm('¿Estás seguro de que querés eliminar este alumno? Esta acción no se puede deshacer.')) {
              router.delete(`/pime/borrar-perfil-alumnos/${alumno.id}`, {
                onSuccess: () => {
                  alert('Alumno eliminado con éxito.');
                }
              });
            }
          }}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Eliminar perfil del alumno.
        </button>

      </form>

      <br />
      <Link href="/pime/alumnos"
      style={{
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px'
      }}
      >← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilAlumno;

