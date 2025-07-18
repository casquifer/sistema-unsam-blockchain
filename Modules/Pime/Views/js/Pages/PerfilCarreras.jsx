import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

const PerfilCarrera = () => {
  const { carrera } = usePage().props;

  const { data, setData, patch, processing, errors } = useForm({
    nombre_carrera: carrera.nombre_carrera || '',
    codigo_carrera: carrera.codigo_carrera || '',
    escuela_carrera: carrera.escuela_carrera || '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/pime/perfil-carreras-actualizar/${carrera.id}`, {
      onSuccess: () => {
        alert('Modificación realizada con éxito.');
      },
    });
  };

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Editar Carrera</h1>
      <div class="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div class="contenedor-datos-alumnos">
          <div class="campos-alumnos">
            <label>Nombre*</label><br />
            <input value={data.nombre_carrera} onChange={e => setData('nombre_carrera', e.target.value)} />
            {errors.nombre_carrera && <div style={{ color: 'red' }}>{errors.nombre_carrera}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Código*</label><br />
            <input value={data.codigo_carrera} onChange={e => setData('codigo_carrera', e.target.value)} />
            {errors.codigo_carrera && <div style={{ color: 'red' }}>{errors.codigo_carrera}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Escuela*</label><br />
            <input value={data.escuela_carrera} onChange={e => setData('escuela_carrera', e.target.value)} />
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
            if (confirm('¿Estás seguro de que querés eliminar esta carrera?')) {
              router.delete(`/pime/borrar-perfil-carreras/${carrera.id}`, {
                onSuccess: () => alert('carrera eliminada con éxito.')
              });
            }
          }}
        >
          Eliminar carrera
        </button>
      </form>

      <br />
      <Link href="/pime/carreras"  class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilCarrera;

