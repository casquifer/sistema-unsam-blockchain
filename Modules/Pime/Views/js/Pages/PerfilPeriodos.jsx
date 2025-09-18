import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

// Helpers
const toDateInput = (iso) => (iso ? String(iso).slice(0, 10) : '');           // "2026-11-30"
const toIsoAtMidnightZ = (ymd) => (ymd ? `${ymd}T00:00:00Z` : '');            // por si querés reenviar en ISO

const PerfilPeriodo = () => {
  const { periodo } = usePage().props;

  const { data, setData, patch, post, processing, errors } = useForm({
    nombre: periodo?.nombre ?? '',
    // Normalizamos lo que viene del back para que el <input type="date"> lo entienda
    fecha_inicio: toDateInput(periodo?.fecha_inicio),
    fecha_fin: toDateInput(periodo?.fecha_fin),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
       ...data,
       fecha_inicio: toIsoAtMidnightZ(data.fecha_inicio),
       fecha_fin: toIsoAtMidnightZ(data.fecha_fin),
    };
    patch(`/pime/perfil-periodos-actualizar/${periodo.id}`, { data: payload, onSuccess: () => alert('Modificación realizada con éxito.')});
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Logout</button>

      <h1 className="titulos">Editar periodo</h1>
      <div className="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div className="contenedor-datos-alumnos">
          <div className="campos-alumnos">
            <label>Nombre*</label><br />
            <input
              value={data.nombre}
              onChange={e => setData('nombre', e.target.value)}
            />
            {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Fecha Inicio*</label><br />
            <input
              type="date"
              value={data.fecha_inicio}                  // "YYYY-MM-DD"
              onChange={e => setData('fecha_inicio', e.target.value)}
            />
            {errors.fecha_inicio && <div style={{ color: 'red' }}>{errors.fecha_inicio}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Fecha Fin*</label><br />
            <input
              type="date"
              value={data.fecha_fin}                     // "YYYY-MM-DD"
              onChange={e => setData('fecha_fin', e.target.value)}
            />
            {errors.fecha_fin && <div style={{ color: 'red' }}>{errors.fecha_fin}</div>}
          </div>
        </div>

        <br />
        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={processing} className="boton-guardar">Guardar</button>
        </div>

        <button
          type="button"
          className="boton-eliminar"
          onClick={() => {
            if (confirm('¿Estás seguro de que querés eliminar este periodo?')) {
              router.delete(`/pime/borrar-perfil-periodos/${periodo.id}`, {
                onSuccess: () => alert('Periodo eliminado con éxito.'),
              });
            }
          }}
        >
          Eliminar periodo
        </button>
      </form>

      <br />
      <Link href="/pime/periodos" className="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilPeriodo;


