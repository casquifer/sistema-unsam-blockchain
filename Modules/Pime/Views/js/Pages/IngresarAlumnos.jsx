import React, { useState, useEffect } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { usePage, useForm, Link } from '@inertiajs/react';

const Alumnos = () => {
  const { data, setData, post, processing, errors } = useForm({
    nombre: '',
    apellido: '',
    pais: '',
    universidad: '',
    sede_universidad: '',
    carrera: '',
    nivel_academico: '',
    responsable_intercambio: '',
    anio_carrera: '',
    nivel_espaniol: '',
    correo: '',
    correo_alternativo: '',
    fecha_inscripcion: '',
    genero: '',
    fecha_nacimiento: '',
    nacionalidad: '',
    documento: '',
    pasaporte: '',
    telefono: '',
    direccion: '',
    contacto_emergencia: '',
    telefono_emergencia: '',
    condicion_especial: '',
    fecha_inicio_estudios: '',
    estado_postulacion: '',
    carrera_principal: '',
    materia_principal_1: '',
    materia_principal_2: '',
    materia_principal_3: '',
    materia_optativa_1: '',
    materia_optativa_2: '',
    fecha_final_estudios: ''
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
  
  // Cargar materias
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    fetch('/pime/materias-todas')
      .then((res) => res.json())
      .then(setMaterias)
      .catch((err) => console.error(err));
  }, []);

  // Cargar carreras
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    fetch('/pime/carreras-todas')
      .then((res) => res.json())
      .then(setCarreras)
      .catch((err) => console.error(err));
  }, []);

  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Ingresar Alumno</h1>
      <div class="linea-titulos"></div>

      <form onSubmit={handleSubmit}>
        <div class="contenedor-datos-alumnos">
        <div class="campos-alumnos">
          <label>Nombre*</label><br />
          <input value={data.nombre} onChange={e => setData('nombre', e.target.value)} />
          {errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
        </div>

        <div class="campos-alumnos">
          <label>Apellido*</label><br />
          <input value={data.apellido} onChange={e => setData('apellido', e.target.value)} />
          {errors.apellido && <div style={{ color: 'red' }}>{errors.apellido}</div>}
        </div>

        <div class="campos-alumnos">
          <label>Pais de Origen</label><br />
          <input value={data.pais} onChange={e => setData('pais', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Universidad Origen</label><br />
          <input value={data.universidad} onChange={e => setData('universidad', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Sede Universidad</label><br />
          <input value={data.sede_universidad} onChange={e => setData('sede_universidad', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Carrera Origen</label><br />
          <input value={data.carrera} onChange={e => setData('carrera', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Nivel Académico</label><br />
          <input value={data.nivel_academico} onChange={e => setData('nivel_academico', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Responsable Intecambio</label><br />
          <input value={data.responsable_intecambio} onChange={e => setData('responsable_intecambio', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Año Carrera</label><br />
          <input value={data.anio_carrera} onChange={e => setData('anio_carrera', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Nivel Español</label><br />
          <input value={data.nivel_espaniol} onChange={e => setData('nivel_espaniol', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Correo*</label><br />
          <input type="email" value={data.correo} onChange={e => setData('correo', e.target.value)} />
          {errors.correo && <div style={{ color: 'red' }}>{errors.correo}</div>}
        </div>

        <div class="campos-alumnos">
          <label>Correo Alternativo</label><br />
          <input type="email" value={data.correo_alternativo} onChange={e => setData('correo_alternativo', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Fecha Inscripción</label><br />
          <input type="date" value={data.fecha_inscripcion} onChange={e => setData('fecha_inscripcion', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Genero</label><br />
          <input value={data.genero} onChange={e => setData('genero', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Fecha Nacimiento</label><br />
          <input type="date" value={data.fecha_nacimiento} onChange={e => setData('fecha_nacimiento', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Nacionalidad</label><br />
          <input value={data.nacionalidad} onChange={e => setData('nacionalidad', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Documento</label><br />
          <input value={data.documento} onChange={e => setData('documento', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Pasaporte</label><br />
          <input value={data.pasaporte} onChange={e => setData('pasaporte', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Teléfono</label><br />
          <input value={data.telefono} onChange={e => setData('telefono', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Dirección</label><br />
          <input value={data.direccion} onChange={e => setData('direccion', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Contacto Emergencia</label><br />
          <input value={data.contacto_emergencia} onChange={e => setData('contacto_emergencia', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Teléfono Emergencia</label><br />
          <input value={data.telefono_emergencia} onChange={e => setData('telefono_emergencia', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Condición Especial</label><br />
          <input value={data.condicion_especial} onChange={e => setData('condicion_especial', e.target.value)} />
        </div>

        <div class="campos-alumnos">
          <label>Fecha de Inicio de Estudios</label><br />
          <input type="date" value={data.fecha_inicio_estudios} onChange={e => setData('fecha_inicio_estudios', e.target.value)} />
        </div>

        <div className="campos-alumnos">
          <label>Estado de Postulación</label><br />
          <select
            value={data.estado_postulacion}
            onChange={e => setData('estado_postulacion', e.target.value)}
          >
            <option value="">Seleccionar estado</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobada">Aprobada</option>
            <option value="Rechazada">Rechazada</option>
            <option value="Terminada">Terminada</option>
          </select>
        </div>

        <div className="campos-alumnos">
          <label>Carrera Principal</label><br />
          <select value={data.carrera_principal} onChange={e => setData('carrera_principal', e.target.value)}>
            <option value="">Seleccionar</option>
            {carreras.map((m) => <option key={m.id} value={m.nombre_carrera}>{m.nombre_carrera}</option>)}
          </select>
        </div>

        <div className="campos-alumnos">
          <label>Materia Principal 1</label><br />
          <select value={data.materia_principal_1} onChange={e => setData('materia_principal_1', e.target.value)}>
            <option value="">Seleccionar</option>
            {materias.map((m) => <option key={m.id} value={m.nombre_materia}>{m.nombre_materia}</option>)}
          </select>
        </div>

        <div className="campos-alumnos">
          <label>Materia Principal 2</label><br />
          <select value={data.materia_principal_2} onChange={e => setData('materia_principal_2', e.target.value)}>
            <option value="">Seleccionar</option>
            {materias.map((m) => <option key={m.id} value={m.nombre_materia}>{m.nombre_materia}</option>)}
          </select>
        </div>

        <div className="campos-alumnos">
          <label>Materia Principal 3</label><br />
          <select value={data.materia_principal_3} onChange={e => setData('materia_principal_3', e.target.value)}>
            <option value="">Seleccionar</option>
            {materias.map((m) => <option key={m.id} value={m.nombre_materia}>{m.nombre_materia}</option>)}
          </select>
        </div>

        <div className="campos-alumnos">
          <label>Materia Optativa 1</label><br />
          <select value={data.materia_optativa_1} onChange={e => setData('materia_optativa_1', e.target.value)}>
            <option value="">Seleccionar</option>
            {materias.map((m) => <option key={m.id} value={m.nombre_materia}>{m.nombre_materia}</option>)}
          </select>
        </div>

        <div className="campos-alumnos">
          <label>Materia Optativa 2</label><br />
          <select value={data.materia_optativa_2} onChange={e => setData('materia_optativa_2', e.target.value)}>
            <option value="">Seleccionar</option>
            {materias.map((m) => <option key={m.id} value={m.nombre_materia}>{m.nombre_materia}</option>)}
          </select>
        </div>

        <div class="campos-alumnos">
          <label>Fecha final de Estudios</label><br />
          <input type="date" value={data.fecha_final_estudios} onChange={e => setData('fecha_final_estudios', e.target.value)} />
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
      <Link href="/pime/alumnos" class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default Alumnos;

