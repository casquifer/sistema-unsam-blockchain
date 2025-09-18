import React, { useState, useEffect } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { usePage, useForm, Link } from '@inertiajs/react';

const IngresarUniversidad = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    pais: '',
    nombre_contacto: '',
    correo: '',
    direccion: '',
    tipo_convenio: '',
    fecha_alta_convenio: '',
    fecha_vencimiento_convenio: '',
    extras: '',
  });

  const { flash } = usePage().props;

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/pime/guardar-universidad', {
      onSuccess: () => {
        alert('Universidad guardada correctamente.');
      },
    });
  };

  const [convenios, setConvenios] = useState([]);

  useEffect(() => {
    fetch('/pime/convenios-todas')
      .then(res => res.json())
      .then(setConvenios)
      .catch(err => console.error(err));
  }, []);

  
  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 className="titulos">Ingresar Universidad</h1>
      <div className="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div className="contenedor-datos-alumnos">
          <div className="campos-alumnos">
            <label>Nombre*</label>
            <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
            {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Pais*</label>
            <input value={data.pais} onChange={e => setData('pais', e.target.value)} />
            {errors.pais && <div style={{ color: 'red' }}>{errors.pais}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Contacto*</label>
            <input value={data.nombre_contacto} onChange={e => setData('nombre_contacto', e.target.value)} />
            {errors.nombre_contacto && <div style={{ color: 'red' }}>{errors.nombre_contacto}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Correo*</label>
            <input value={data.correo} onChange={e => setData('correo', e.target.value)} />
            {errors.correo && <div style={{ color: 'red' }}>{errors.correo}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Dirección</label>
            <input value={data.direccion} onChange={e => setData('direccion', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Convenio*</label>
            <select value={data.tipo_convenio} onChange={e => setData('tipo_convenio', e.target.value)}>
              <option value="">Seleccionar</option>
              {convenios.map((c) => (
                <option key={c.id} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
            {errors.tipo_convenio && <div style={{ color: 'red' }}>{errors.tipo_convenio}</div>}
          </div>


          <div className="campos-alumnos">
            <label>Alta Convenio*</label>
            <input type="date" value={data.fecha_alta_convenio} onChange={e => setData('fecha_alta_convenio', e.target.value)} />
            {errors.fecha_alta_convenio && <div style={{ color: 'red' }}>{errors.fecha_alta_convenio}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Vencimiento Convenio*</label>
            <input type="date" value={data.fecha_vencimiento_convenio} onChange={e => setData('fecha_vencimiento_convenio', e.target.value)} />
            {errors.fecha_vencimiento_convenio && <div style={{ color: 'red' }}>{errors.fecha_vencimiento_convenio}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Extras</label>
            <input value={data.extras} onChange={e => setData('extras', e.target.value)} />
          </div>        
        </div>

        
        <div style={{ marginTop: '20px' }}>
        <button type="submit" disabled={processing} className="boton-guardar">
          Guardar
        </button>
      </div>
      </form>

      <br></br>
      <Link href="/pime/universidades" className="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default IngresarUniversidad;

