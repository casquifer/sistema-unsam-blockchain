import React, { useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, Link } from '@inertiajs/react';

const IngresarCarrera = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre_carrera: '',
    codigo_carrera: '',
    escuela_carrera: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pime/guardar-carrera', {
      onSuccess: () => {
        alert('Carrera creada exitosamente');
        setData({
          nombre_carrera: '',
          codigo_carrera: '',
          escuela_carrera: '',
        });
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
            {errors.escuela_carrera && <div style={{ color: 'red' }}>{errors.escuela_carrera}</div>}
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
      <Link href="/pime/carreras" class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default IngresarCarrera;


