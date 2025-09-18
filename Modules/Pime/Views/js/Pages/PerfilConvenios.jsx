import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

const PerfilConvenio = () => {
  const { convenio } = usePage().props;

  const { data, setData, patch, post, processing, errors } = useForm({
    nombre: convenio.nombre || '',
    tipo: convenio.tipo || '',
    observaciones: convenio.observaciones || '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/pime/perfil-convenios-actualizar/${convenio.id}`, {
      onSuccess: () => {
        alert('Modificación realizada con éxito.');
      },
    });
  };

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Editar Convenio</h1>
      <div class="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div class="contenedor-datos-alumnos">
          <div class="campos-alumnos">
            <label>Nombre*</label><br />
            <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
            {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Tipo*</label><br />
            <input value={data.tipo} onChange={e => setData('tipo', e.target.value)} />
            {errors.tipo && <div style={{ color: 'red' }}>{errors.tipo}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Observación</label><br />
            <input value={data.observaciones} onChange={e => setData('observaciones', e.target.value)} />
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
            if (confirm('¿Estás seguro de que querés eliminar este convenio?')) {
              router.delete(`/pime/borrar-perfil-convenios/${convenio.id}`, {
                onSuccess: () => alert('Convenio eliminado con éxito.')
              });
            }
          }}
        >
          Eliminar convenio
        </button>
      </form>

      <br />
      <Link href="/pime/convenios"  class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilConvenio;

