import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { usePage, useForm, Link } from '@inertiajs/react';

const Alumnos = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    apellido: '',
    universidad: '',
    sede_universidad: '',
    correo: '',
    correo_alternativo: '',
  });

  const { flash } = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pime/guardar-alumno', {
      onSuccess: () => {
        alert('Alumno guardado correctamente.');
      },
    });
  };
  

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1>Ingresar Alumno</h1>

      <div id="separador" style={{ height: '50px' }}></div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre *</label><br />
          <input
            type="text"
            value={data.nombre}
            onChange={(e) => setData('nombre', e.target.value)}
            required
          />
          {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
        </div>

        <div>
          <label>Apellido *</label><br />
          <input
            type="text"
            value={data.apellido}
            onChange={(e) => setData('apellido', e.target.value)}
            required
          />
          {errors.apellido && <div style={{ color: 'red' }}>{errors.apellido}</div>}
        </div>

        <div>
          <label>Nombre Universidad</label><br />
          <input
            type="text"
            value={data.universidad}
            onChange={(e) => setData('universidad', e.target.value)}
          />
        </div>

        <div>
          <label>Sede Universidad</label><br />
          <input
            type="text"
            value={data.sede}
            onChange={(e) => setData('sede_universidad', e.target.value)}
          />
        </div>

        <div>
          <label>Correo *</label><br />
          <input
            type="email"
            value={data.correo}
            onChange={(e) => setData('correo', e.target.value)}
            required
          />
          {errors.correo && <div style={{ color: 'red' }}>{errors.correo}</div>}
        </div>

        <div>
          <label>Correo Alternativo</label><br />
          <input
            type="email"
            value={data.correo_alternativo}
            onChange={(e) => setData('correo_alternativo', e.target.value)}
          />
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={processing}>Guardar Alumno</button>
        </div>
      </form>
    </AppLayout>
  );
};

export default Alumnos;

