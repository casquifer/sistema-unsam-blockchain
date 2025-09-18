import React, { useState, useEffect } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { useForm, usePage, Link, router } from '@inertiajs/react';

const PerfilAlumno = () => {
  const { alumno } = usePage().props;
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estado para los archivos
  const [archivos, setArchivos] = useState({
    archivo_pasaporte: null,
    archivo_visa: null,
    archivo_analitico: null,
    archivo_idioma: null,
    archivo_carta_recomendacion: null,
    archivo_cv: null
  });

  const { data, setData, post, patch, processing, errors } = useForm({
    nombre: alumno.nombre || '',
    apellido: alumno.apellido || '',
    pais: alumno.pais || '',
    universidad: alumno.universidad || '',
    sede_universidad: alumno.sede_universidad || '',
    carrera: alumno.carrera || '',
    nivel_academico: alumno.nivel_academico || '',
    responsable_intercambio: alumno.responsable_intercambio || '',
    anio_carrera: alumno.anio_carrera || '',
    nivel_espaniol: alumno.nivel_espaniol || '',
    correo: alumno.correo || '',
    correo_alternativo: alumno.correo_alternativo || '',
    genero: alumno.genero || '',
    fecha_nacimiento: alumno.fecha_nacimiento || '',
    nacionalidad: alumno.nacionalidad || '',
    documento: alumno.documento || '',
    pasaporte: alumno.pasaporte || '',
    telefono: alumno.telefono || '',
    direccion: alumno.direccion || '',
    contacto_emergencia: alumno.contacto_emergencia || '',
    telefono_emergencia: alumno.telefono_emergencia || '',
    condicion_especial: alumno.condicion_especial || ''
  });


  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    setArchivos(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Formulario Datos Personales
  const handleSubmitPersonales = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    // Agregar todos los campos de datos al FormData
    Object.keys(data).forEach(key => {
      if (key.startsWith('archivo_')) return; // Excluimos los archivos del objeto data
      formData.append(key, data[key]);
    });
    
    // Agregar archivos al FormData si existen
    Object.keys(archivos).forEach(key => {
      if (archivos[key]) {
        formData.append(key, archivos[key]);
      }
    });

    router.post(`/pime/perfil-alumnos-actualizar/${alumno.id}`, formData, {
      forceFormData: true,
      onSuccess: () => {
        alert('Modificación realizada con éxito.');
      },
      onError: (errors) => {
        console.error('Error al guardar:', errors);
      }
    });
  };

  // Cargar carreras
  const [carreras, setCarreras] = useState([]);
  useEffect(() => {
    fetch('/pime/carreras-todas')
      .then((res) => res.json())
      .then(setCarreras)
      .catch((err) => console.error(err));
  }, []);

  // Cargar materias
  const [materias, setMaterias] = useState([]);
  useEffect(() => {
    fetch('/pime/materias-todas')
      .then((res) => res.json())
      .then(setMaterias)
      .catch((err) => console.error(err));
  }, []);

  const crearPostulacion = () => {
    router.post(`/pime/ingresar-postulacion/${alumno.id}`);
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 className="titulos">Perfil del Alumno: <strong className="color-datos">{alumno.nombre} {alumno.apellido}</strong></h1>
      <div className="linea-titulos"></div>

      <p>Para ver o editar la información personal del alumno, presione el siguiente botón.</p>
      
      <button
        type="button"
        className="boton-toggle-form"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >
        {mostrarFormulario ? 'Ocultar Datos Personales' : 'Ver Datos Personales'}
      </button>

      {mostrarFormulario && (
      <form onSubmit={handleSubmitPersonales} encType="multipart/form-data">
        <input type="hidden" name="_method" value="PATCH" />

        <h2 className="titulos-secciones-formulario">Datos Personales</h2>
        <div className="linea-titulos"></div>

        <div className="contenedor-datos-alumnos">
          <div className="campos-alumnos">
            <label>Nombre</label><br />
            <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
            {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Apellido</label><br />
            <input value={data.apellido} onChange={e => setData('apellido', e.target.value)} />
            {errors.apellido && <div style={{ color: 'red' }}>{errors.apellido}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Pais de Origen</label><br />
            <input value={data.pais} onChange={e => setData('pais', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Universidad Origen</label><br />
            <input value={data.universidad} onChange={e => setData('universidad', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Sede Universidad</label><br />
            <input value={data.sede_universidad} onChange={e => setData('sede_universidad', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Carrera Origen</label><br />
            <input value={data.carrera} onChange={e => setData('carrera', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Nivel Académico</label><br />
            <input value={data.nivel_academico} onChange={e => setData('nivel_academico', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Responsable Intercambio</label><br />
            <input value={data.responsable_intercambio} onChange={e => setData('responsable_intercambio', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Año Carrera</label><br />
            <input value={data.anio_carrera} onChange={e => setData('anio_carrera', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Nivel Español</label><br />
            <input value={data.nivel_espaniol} onChange={e => setData('nivel_espaniol', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Correo</label><br />
            <input type="email" value={data.correo} onChange={e => setData('correo', e.target.value)} />
            {errors.correo && <div style={{ color: 'red' }}>{errors.correo}</div>}
          </div>

          <div className="campos-alumnos">
            <label>Correo Alternativo</label><br />
            <input type="email" value={data.correo_alternativo} onChange={e => setData('correo_alternativo', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Género</label><br />
            <input value={data.genero} onChange={e => setData('genero', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Fecha Nacimiento</label><br />
            <input type="date" value={data.fecha_nacimiento} onChange={e => setData('fecha_nacimiento', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Nacionalidad</label><br />
            <input value={data.nacionalidad} onChange={e => setData('nacionalidad', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Documento</label><br />
            <input value={data.documento} onChange={e => setData('documento', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Pasaporte</label><br />
            <input value={data.pasaporte} onChange={e => setData('pasaporte', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Teléfono</label><br />
            <input value={data.telefono} onChange={e => setData('telefono', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Dirección</label><br />
            <input value={data.direccion} onChange={e => setData('direccion', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Contacto Emergencia</label><br />
            <input value={data.contacto_emergencia} onChange={e => setData('contacto_emergencia', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Teléfono Emergencia</label><br />
            <input value={data.telefono_emergencia} onChange={e => setData('telefono_emergencia', e.target.value)} />
          </div>

          <div className="campos-alumnos">
            <label>Condición Especial</label><br />
            <input value={data.condicion_especial} onChange={e => setData('condicion_especial', e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" disabled={processing} className="boton-guardar">
            Guardar cambios
          </button>
          <button
            type="button"
            className="boton-eliminar"
            onClick={() => {
              if (confirm('¿Estás seguro de que querés eliminar este alumno?')) {
                router.delete(`/pime/borrar-perfil-alumnos/${alumno.id}`, {
                  onSuccess: () => alert('Alumno eliminado con éxito.')
                });
              }
            }}
          >
            Eliminar perfil del alumno
          </button>
        </div>
      </form>
      )}

      <br></br> 

      <p>Para crear una postulación, presione el siguiente botón.</p>

      <button className="boton-aceptar-postulacion" onClick={crearPostulacion}>Crear Postulación</button>


      
      
      <br /><br />
      <Link href="/pime/alumnos" className="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilAlumno;
