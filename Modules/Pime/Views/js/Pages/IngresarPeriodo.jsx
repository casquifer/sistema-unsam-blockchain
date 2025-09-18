import React, { useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, Link } from '@inertiajs/react';

const IngresarPeriodo = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    fecha_inicio: '',
    fecha_fin: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pime/guardar-periodo', {
      onSuccess: () => {
        alert('Periodo creado exitosamente');
        setData({
          nombre: '',
          fecha_inicio: '',
          fecha_fin: '',
        });
      },
    });
  };

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Ingresar Periodo</h1>
      <div class="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div class="contenedor-datos-alumnos">
          <div class="campos-alumnos">
            <label>Nombre*</label><br />
            <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
            {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Fecha Inicio*</label><br />
            <input type="date" value={data.fecha_inicio} onChange={e => setData('fecha_inicio', e.target.value)} />
            {errors.fecha_inicio && <div style={{ color: 'red' }}>{errors.fecha_inicio}</div>}
          </div>

          <div class="campos-alumnos">
            <label>Fecha Fin*</label><br />
            <input type="date" value={data.fecha_fin} onChange={e => setData('fecha_fin', e.target.value)} />
            {errors.fecha_fin && <div style={{ color: 'red' }}>{errors.fecha_fin}</div>}
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
      <Link href="/pime/periodos" class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default IngresarPeriodo;


