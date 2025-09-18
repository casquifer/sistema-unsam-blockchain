import React, { useState, useEffect } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm, usePage, router } from '@inertiajs/react';

const PerfilPostulacion = () => {
  const { postulacion } = usePage().props;
  const { alumno } = usePage().props;

  // Para el logout
  const { post } = useForm({});

  // Formulario de la postulación (campos simples)
  const [postulacionForm, setPostulacion] = useState({
    postulacion_id: postulacion.id,
    alumno_id: '',
    periodo_inicio: '',
    periodo_final: '',
    carrera: '',
    estado: '',
  });

  // Materias de la postulación (dinámicas)
  const [materiasForm, setMateriasForm] = useState([
    { materia_id: '', materia_estado: '', acceso_campus_virtual: '', fecha_final: '' },
  ]);

  const agregarMateria = () => {
    setMateriasForm((prev) => [
      ...prev,
      { materia_id: '', materia_estado: '', acceso_campus_virtual: '', fecha_final: '' },
    ]);
  };

  const eliminarMateria = (index) => {
    setMateriasForm((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMateriaChange = (index, field, value) => {
    setMateriasForm((prev) => {
      const copia = [...prev];
      copia[index][field] = value;
      return copia;
    });
  };

  const handlePostulacionChange = (field, value) => {
    setPostulacion((p) => ({ ...p, [field]: value }));
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

  // Armo el payload estándar
  const makePayload = () => ({
    alumno_id: alumno.id,
    fecha_inicio: postulacionForm.fecha_inicio,
    fecha_fin: postulacionForm.fecha_final,
    carrera: postulacionForm.carrera,
    estado: postulacionForm.estado,
    materias: materiasForm.map((m) => ({
      materia_id: m.materia_id,
      estado: m.materia_estado,
      acceso_campus_virtual: m.acceso_campus_virtual,
      fecha_final: m.fecha_final,
    })),
    // archivos: [] // si más adelante adjuntás archivos, agregalos aquí
  });

  // Acciones
  const CrearPostulacion = () => {
    router.post('/pime/crear-postulacion', makePayload(), {
      onSuccess: () => alert('La postulación fue creada con éxito.'),
      onError: (errors) => console.error('Error al crear la postulación:', errors),
    });
  };

  const GuardarPostulacion = () => {
    router.post('/pime/guardar-postulacion', makePayload(), {
      onSuccess: () => alert('La postulación se guardó con éxito.'),
      onError: (errors) => console.error('Error al guardar la postulación:', errors),
    });
  };

  const EliminarPostulacion = () => {
    router.post(`/pime/eliminar-postulacion/${postulacion.id}`, {}, {
      onSuccess: () => alert('La postulación fue eliminada con éxito.'),
      onError: (errors) => console.error('Error al eliminar la postulación:', errors),
    });
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Logout</button>

      <h1 className="titulos">
        Postulación: <strong className="color-datos">{alumno.nombre} {alumno.apellido}</strong>
      </h1>
      <div className="linea-titulos"></div>

      {/* Formulario de datos de la postulación */}
      <form onSubmit={(e) => { e.preventDefault(); GuardarPostulacion(); }}>
        <br />

        <div className="contenedor-datos-alumnos">
          <div className="campos-alumnos">
            <label>Fecha de Inicio</label><br />
            <input
              type="date"
              value={postulacion.periodo_inicio_id}
              onChange={(e) => handlePostulacionChange('periodo_inicio_id', e.target.value)}
            />
          </div>

          <div className="campos-alumnos">
            <label>Fecha final</label><br />
            <input
              type="date"
              value={postulacion.periodo_fin_id}
              onChange={(e) => handlePostulacionChange('periodo_fin_id', e.target.value)}
            />
          </div>

          <div className="campos-alumnos">
            <label>Carrera Principal</label><br />
            <select
              value={postulacion.carrera_principal}
              onChange={(e) => handlePostulacionChange('carrera_principal', e.target.value)}
            >
              <option value="">Seleccionar</option>
              {carreras.map((m) => (
                <option key={m.id} value={m.nombre_carrera}>{m.nombre_carrera}</option>
              ))}
            </select>
          </div>

          <div className="campos-alumnos">
            <label>Estado Postulación</label><br />
            <select
              value={postulacion.estado}
              onChange={(e) => handlePostulacionChange('estado', e.target.value)}
            >
              <option value="">Seleccionar</option>
              <option value="Aceptada">Aceptada</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Rechazada">Rechazada</option>
            </select>
          </div>
        </div>

        <h1 className="titulos">Agregar Materias</h1>
        <div className="linea-titulos"></div>

        <div id="contenedorMaterias">
          {materiasForm.map((fila, index) => (
            <div key={index} className="materia" style={{ borderBottom: '1px solid #eaeaea', paddingBottom: 10, marginBottom: 10 }}>
              <div className="campos-alumnos">
                <label>Materia</label><br />
                <select
                  value={fila.materia_id}
                  onChange={(e) => handleMateriaChange(index, 'materia_id', e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {materias.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre_materia}</option>
                  ))}
                </select>
              </div>

              <div className="campos-alumnos">
                <label>Estado Cursada</label><br />
                <select
                  value={fila.materia_estado}
                  onChange={(e) => handleMateriaChange(index, 'materia_estado', e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="abandono">Abandonó</option>
                  <option value="anotado">Anotado</option>
                  <option value="cursando">Cursando</option>
                  <option value="promociono">Promocionó</option>
                  <option value="reprobo">Reprobó</option>
                  <option value="rinde_final">Rinde Final</option>
                </select>
              </div>

              <div className="campos-alumnos">
                <label>Acceso Aula Virtual</label><br />
                <select
                  value={fila.acceso_campus_virtual}
                  onChange={(e) => handleMateriaChange(index, 'acceso_campus_virtual', e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="ingreso">Ingresó</option>
                  <option value="no_ingreso">No Ingresó</option>
                  <option value="no_tiene">No Tiene</option>
                </select>
              </div>

              <div className="campos-alumnos">
                <label>Fecha Final</label><br />
                <input
                  type="date"
                  value={fila.fecha_final}
                  onChange={(e) => handleMateriaChange(index, 'fecha_final', e.target.value)}
                />
              </div>

              <div className="campos-alumnos">
                <label>Tipo Materia</label><br />
                <select
                  value={fila.materia_prioridad}
                  onChange={(e) => handleMateriaChange(index, 'materia_prioridad', e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="principal">Principal</option>
                  <option value="optativa">Optativa</option>
                </select>
              </div>

              {materiasForm.length > 1 && (
                <div className="campos-alumnos" style={{ alignItems: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => eliminarMateria(index)}
                    className="boton-eliminar"
                  >
                    Quitar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="button" onClick={agregarMateria}>
          Agregar Materia +
        </button>

        <h1 className="titulos">Archivos Postulaciones (PDF/JPG/PNG)</h1>
        <div className="linea-titulos"></div>
        <p>Documentos:</p>
        <p>
          Por favor ingresar el nombre correspondiente a cada archivo, por ejemplo:
          <strong> pasaporte.pdf</strong> o <strong> carta_de_recomendacion.jpg</strong>
        </p>
        {/* Más adelante podés armar inputs de archivos y añadirlos al payload si los vas a persistir */}

        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="boton-aceptar-postulacion" onClick={CrearPostulacion}>
            Crear Postulación
          </button>
          <button type="submit" className="boton-aceptar-postulacion">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="boton-rechazar-postulacion"
            onClick={EliminarPostulacion}
          >
            Eliminar Postulación
          </button>
        </div>
      </form>

      <br /><br />
      <Link href="/pime/postulaciones" className="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default PerfilPostulacion;
