import React from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

const PerfilUniversidad = () => {
  const { universidad } = usePage().props;

  const { data, setData, patch, processing, errors } = useForm({
    nombre: universidad.nombre || '',
    pais: universidad.pais || '',
    nombre_contacto: universidad.nombre_contacto || '',
    correo: universidad.correo || '',
    direccion: universidad.direccion || '',
    tipo_convenio: universidad.tipo_convenio || '',
    fecha_alta_convenio: universidad.fecha_alta_convenio || '',
    fecha_vencimiento_convenio: universidad.fecha_vencimiento_convenio || '',
    extras: universidad.extras || '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    patch(`/pime/perfil-universidad-actualizar/${universidad.id}`, {
      onSuccess: () => {
        alert('Modificación realizada con éxito.');
      },
    });
  };

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Editar Perfil de Universidad</h1>
      <div class="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div class="contenedor-datos-alumnos">
          <div class="campos-alumnos">
              <label>Nombre*</label>
              <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
              {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Pais*</label>
              <input value={data.pais} onChange={e => setData('pais', e.target.value)} />
              {errors.pais && <div style={{ color: 'red' }}>{errors.pais}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Contacto*</label>
              <input value={data.nombre_contacto} onChange={e => setData('nombre_contacto', e.target.value)} />
              {errors.nombre_contacto && <div style={{ color: 'red' }}>{errors.nombre_contacto}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Correo*</label>
              <input value={data.correo} onChange={e => setData('correo', e.target.value)} />
              {errors.correo && <div style={{ color: 'red' }}>{errors.correo}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Dirección</label>
              <input value={data.direccion} onChange={e => setData('direccion', e.target.value)} />
            </div>

            <div class="campos-alumnos">
              <label>Tipo Convenio*</label>
              <input value={data.tipo_convenio} onChange={e => setData('tipo_convenio', e.target.value)} />
              {errors.tipo_convenio && <div style={{ color: 'red' }}>{errors.tipo_convenio}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Alta Convenio*</label>
              <input type="date" value={data.fecha_alta_convenio} onChange={e => setData('fecha_alta_convenio', e.target.value)} />
              {errors.fecha_alta_convenio && <div style={{ color: 'red' }}>{errors.fecha_alta_convenio}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Vencimiento Convenio*</label>
              <input type="date" value={data.fecha_vencimiento_convenio} onChange={e => setData('fecha_vencimiento_convenio', e.target.value)} />
              {errors.fecha_vencimiento_convenio && <div style={{ color: 'red' }}>{errors.fecha_vencimiento_convenio}</div>}
            </div>

            <div class="campos-alumnos">
              <label>Extras</label>
              <input value={data.extras} onChange={e => setData('extras', e.target.value)} />
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
            if (confirm('¿Estás seguro de que querés eliminar esta Universidad?')) {
              router.delete(`/pime/borrar-perfil-universidad/${universidad.id}`, {
                onSuccess: () => alert('Universidad eliminada con éxito.')
              });
            }
          }}
        >
          Eliminar Universidad
        </button>
      </form>

      <br />
      <Link href="/pime/universidades"  class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilUniversidad;

