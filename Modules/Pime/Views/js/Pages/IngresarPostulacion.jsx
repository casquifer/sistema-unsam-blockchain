import React, { useState, useEffect } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { usePage, useForm, Link, router } from '@inertiajs/react';


const Postulacion = () => {
  const { alumno } = usePage().props;

  // Para el logout
  const { post } = useForm({});

  // Formulario de la postulación (campos simples)
  const [postulacion, setPostulacion] = useState({
    periodo_inicio_id: '',
    periodo_fin_id: '',
    carrera_principal: '',
    estado: '',
  });

  // Materias de la postulación (dinámicas)
  const [materiasForm, setMateriasForm] = useState([
    { materia_id: '', materia_estado: '', materia_tipo: '', acceso_campus_virtual: '', fecha_examen_final: '' },
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

  // Cargar periodos
  const [periodos, setPeriodos] = useState([]);

  useEffect(() => {
    fetch('/pime/periodos-todos')
      .then((res) => res.json())
      .then(setPeriodos)
      .catch((err) => console.error(err));
  }, []);

  const [archivos, setArchivos] = useState([]); 

  const handleFilesChange = (e) => {
    const aceptados = ['application/pdf', 'image/png', 'image/jpeg'];
    const files = Array.from(e.target.files || []);
  
    const nuevos = files
      .filter((f) => aceptados.includes(f.type))
      .map((f, i) => ({
        id: (crypto?.randomUUID?.() ?? `${Date.now()}-${i}`),
        file: f,
        preview: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
      }));
  
    setArchivos((prev) => [...prev, ...nuevos]);
    e.target.value = ''; // permite volver a elegir el mismo archivo si hace falta
  };
  
  const quitarArchivo = (id) => {
    setArchivos((prev) => prev.filter((a) => a.id !== id));
  };
  
  const makePayload = () => ({
    alumno_id: alumno.id,
    periodo_inicio_id: postulacion.periodo_inicio_id,
    periodo_fin_id: postulacion.periodo_fin_id,
    carrera_principal: postulacion.carrera_principal,
    estado: postulacion.estado,
    materias: materiasForm.map((m) => ({
      materia_id: m.materia_id,
      alumno_id: alumno.id,
      periodo_id: postulacion.periodo_inicio_id,
      estado: m.materia_estado,
      acceso_campus_virtual: m.acceso_campus_virtual,
      fecha_examen_final: m.fecha_examen_final || '',
      materia_prioridad: m.materia_prioridad || '',
      periodo: m.periodo || '',
    })),
    // Archivos
    archivos_meta: archivos.map((a) => ({
      alumno_id: alumno.id,
      periodo_id: postulacion.periodo_inicio_id,
      nombre: a.file.name,
      ruta: ''
    })),
  });
  
  // Acciones
  const buildFormData = () => {
    // Partimos del payload "oficial"
    const payload = makePayload();
  
    // 1) Asegurar que archivos_meta coincida 1:1 con los archivos reales
    payload.archivos_meta = (archivos || []).map((a) => ({
      alumno_id: payload.alumno_id,                // usa el valor final del payload
      periodo_id: payload.periodo_inicio_id,       // idem
      nombre: a?.file?.name || '',
      ruta: ''                                      // lo completa el backend si corresponde
    }));
  
    // 2) Armar el FormData
    const fd = new FormData();
  
    // Enviar el payload como JSON (string). Laravel lo lee con $request->input('payload')
    fd.append('payload', JSON.stringify(payload));
  
    // 3) Adjuntar los archivos binarios con índice estable
    (archivos || []).forEach((a, i) => {
      if (a?.file) {
        fd.append(`archivos[${i}]`, a.file, a.file.name);
      }
    });
    
    return fd;
  };
  
  
  const CrearPostulacion = () => {
    router.post('/pime/crear-postulacion', buildFormData(), {
      forceFormData: true,
      onSuccess: () => alert('La postulación fue creada con éxito.'),
      onError: (errors) => console.error('Error al crear la postulación:', errors),
    });
  };
  
  return (
    <AppLayout>
      <button class="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 class="titulos">Ingresar Postulación de: <strong className="color-datos">{alumno.nombre} {alumno.apellido}</strong></h1>
      <div class="linea-titulos"></div>

      <form onSubmit={(e) => { e.preventDefault(); GuardarPostulacion(); }}>
        <br />
        <div className="contenedor-datos-alumnos">
          <div className="campos-alumnos">
            <label>Periodo Inicio</label><br />
            <select
              value={postulacion.periodo_inicio_id}
              onChange={(e) => handlePostulacionChange('periodo_inicio_id', e.target.value)}
            >
             <option value="">Seleccionar</option>
             {periodos.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
             ))}
            </select>
          </div>

          <div className="campos-alumnos">
            <label>Periodo Fin</label><br />
            <select
              value={postulacion.periodo_fin_id}
              onChange={(e) => handlePostulacionChange('periodo_fin_id', e.target.value)}
            >
             <option value="">Seleccionar</option>
             {periodos.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre}</option>
             ))}
            </select>
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
        <br />

          {materiasForm.map((fila, index) => (
            <div key={index} className="materia contenedor-datos-postulaciones" style={{ borderBottom: '1px solid #eaeaea', paddingBottom: 10, marginBottom: 10 }}>
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
                  <option value="pendiente">Pendiente</option>
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
                  value={fila.fecha_examen_final}
                  onChange={(e) => handleMateriaChange(index, 'fecha_examen_final', e.target.value)}
                />
              </div>

              <div className="campos-alumnos">
                <label>Tipo Materia</label><br />
                <select
                  value={fila.materia_tipo}
                  onChange={(e) => handleMateriaChange(index, 'materia_tipo', e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  <option value="principal">Principal</option>
                  <option value="optativa">Optativa</option>
                </select>
              </div>

              <div className="campos-alumnos">
                <label>Periodo</label><br />
                <select
                  value={fila.periodo}
                  onChange={(e) => handleMateriaChange(index, 'periodo', e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {periodos.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
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

        <button type="button" className="boton_agregar" onClick={agregarMateria}>
          Agregar Materia +
        </button>

        <h1 className="titulos">Archivos Postulaciones (PDF/JPG/PNG)</h1>
        <div className="linea-titulos"></div>
        <p>
          Por favor ingresar el nombre correspondiente a cada archivo, por ejemplo:
          <strong> pasaporte.pdf</strong> o <strong> carta_de_recomendacion.jpg</strong>
        </p>

        <br></br>
        
        <label className="boton_agregar">Cargar Archivo +
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFilesChange}
          className="input_file"
          style={{ display: 'none' }}
        />
        </label>

        <div style={{ marginTop: 16 }}>
          {archivos.length === 0 && <p>No hay archivos seleccionados.</p>}
          {archivos.map((a) => (
            <div
              key={a.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 0',
                borderBottom: '1px solid #eaeaea',
              }}
            >
              {/* Preview si es imagen */}
              {a.preview ? (
                <img
                  src={a.preview}
                  alt={a.file.name}
                  style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }}
                />
              ) : (
                <span style={{ fontSize: 24 }}>📄</span>
              )}

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{a.file.name}</div>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {a.file.type} • {(a.file.size / 1024).toFixed(1)} KB
                </div>
              </div>

              <button
                type="button"
                className="boton-rechazar-postulacion"
                onClick={() => quitarArchivo(a.id)}
                title="Quitar archivo"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
        
        <div className="linea-titulos"></div>

        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="boton-aceptar-postulacion" onClick={CrearPostulacion}>
            Crear Postulación
          </button>
        </div>
      </form>
      <br />
      <Link href="/pime/alumnos" class="boton-volver">← Volver a la lista</Link>
    </AppLayout>
  );
};

export default Postulacion;

