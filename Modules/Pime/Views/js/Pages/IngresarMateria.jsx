import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { usePage, useForm, Link } from '@inertiajs/react';

const Alumnos = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre_materia: '',
    codigo_materia: '',
    escuela: '',
    plan: '',
  });

  const { flash } = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pime/guardar-materia', {
      onSuccess: () => {
        alert('Materia guardada correctamente.');
      },
    });
  };
  

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Ingresar Materia</h1>
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
      </form>

      <br />
      <Link href="/pime/materias" class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default Alumnos;

