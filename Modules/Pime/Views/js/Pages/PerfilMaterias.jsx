import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

const PerfilAlumno = () => {
  const { materia } = usePage().props;

  const { data, setData, patch, processing, errors } = useForm({
    nombre_materia: materia.nombre_materia || '',
    codigo_materia: materia.codigo_materia || '',
    escuela: materia.escuela || '',
    docente: materia.docente || '',
    horario: materia.horario || '',
    plan: materia.plan || '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/pime/perfil-materias-actualizar/${materia.id}`, {
      onSuccess: () => {
        alert('Modificación realizada con éxito.');
      },
    });
  };

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Editar Perfil del Alumno</h1>
      <div class="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div class="contenedor-datos-alumnos">
          <div class="campos-alumnos">
            <label>Nombre*</label><br />
            <input value={data.nombre_materia} onChange={e => setData('nombre_materia', e.target.value)} />
            {errors.nombre_materia && <div style={{ color: 'red' }}>{errors.nombre_materia}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Código*</label><br />
            <input value={data.codigo_materia} onChange={e => setData('codigo_materia', e.target.value)} />
            {errors.codigo_materia && <div style={{ color: 'red' }}>{errors.codigo_materia}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Escuela*</label><br />
            <input value={data.escuela} onChange={e => setData('escuela', e.target.value)} />
            {errors.escuela && <div style={{ color: 'red' }}>{errors.escuela}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Docente</label><br />
            <input value={data.docente} onChange={e => setData('docente', e.target.value)} />
          </div>

          <div class="campos-alumnos">
            <label>Horario</label><br />
            <input value={data.horario} onChange={e => setData('horario', e.target.value)} />
          </div>

          <div class="campos-alumnos">
            <label>Plan</label><br />
            <input value={data.plan} onChange={e => setData('plan', e.target.value)} />
          </div>
        </div>

        <br />
        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={processing} className="boton-guardar">
            Guardar
          </button>
        </div>
        <button
          type="button"
          className="boton-eliminar"
          onClick={() => {
            if (confirm('¿Estás seguro de que querés eliminar esta materia?')) {
              router.delete(`/pime/borrar-perfil-materias/${materia.id}`, {
                onSuccess: () => alert('Materia eliminada con éxito.')
              });
            }
          }}
        >
          Eliminar Materia
        </button>
      </form>

      <br />
      <Link href="/pime/materias"  class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilAlumno;

