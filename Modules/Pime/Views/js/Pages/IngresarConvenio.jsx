import React, { useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, Link } from '@inertiajs/react';

const IngresarConvenio = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    tipo: '',
    observaciones: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pime/guardar-convenio', {
      onSuccess: () => {
        alert('Convenio creado exitosamente');
        setData({
          nombre: '',
          tipo: '',
          observaciones: '',
        });
      },
    });
  };

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Ingresar Convenio</h1>
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
      </form>

      <br />
      <Link href="/pime/convenios" class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default IngresarConvenio;


