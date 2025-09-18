import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

const Alumnos = () => {
  const { post } = useForm({});
  const [alumnos, setAlumnos] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '', correo: '', universidad: '', fecha: '', estado: ''
  });
  const [opciones, setOpciones] = useState({
    correos: [], universidades: [], fechas: [], estados: []
  });

  useEffect(() => {
    fetch('/pime/alumnos-filtrados')
      .then(res => res.json())
      .then(data => {
        setAlumnos(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));

    fetch('/pime/alumnos-opciones')
      .then(res => res.json())
      .then(setOpciones)
      .catch(err => console.error(err));
  }, []);

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/alumnos-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setAlumnos(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  const handleChange = (field, value) => {
    const nuevosFiltros = { ...filters, [field]: value };
    setFilters(nuevosFiltros);
    fetchFiltrados(nuevosFiltros);
  };

  const handlePaginacion = (url) => {
    const qs = new URLSearchParams(filters).toString();
    const urlConFiltros = url.includes('?') ? `${url}&${qs}` : `${url}?${qs}`;

    fetch(urlConFiltros)
      .then(res => res.json())
      .then(data => {
        setAlumnos(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 className="titulos">Gestión de Alumnos</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de alumnos.</p>

      <div style={{ height: '50px' }}></div>

      <div className='contenedor-ingresar'>
        <h1 className="titulos">Ingresar un Alumno</h1>
        <Link href="/pime/ingresar-alumnos" className="ingresar-btn">+</Link>
      </div>

      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Alumnos</h1>

      <table className="table">
        <thead>
          <tr>
            <th className="titulo-tabla-alumnos">
              Nombre y Apellido<br />
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
              />
            </th>
            <th className="titulo-tabla-alumnos">
              Correo<br />
              <select value={filters.correo} onChange={(e) => handleChange('correo', e.target.value)}>
                <option value="">Todos</option>
                {opciones.correos.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Universidad<br />
              <select value={filters.universidad} onChange={(e) => handleChange('universidad', e.target.value)}>
                <option value="">Todas</option>
                {opciones.universidades.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Fecha Inicio<br />
              <select value={filters.fecha} onChange={(e) => handleChange('fecha', e.target.value)}>
                <option value="">Todas</option>
                {/*opciones.fechas.map(f => <option key={f} value={f}>{f}</option>)*/}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Estado Postulación<br />
              <select value={filters.estado} onChange={(e) => handleChange('estado', e.target.value)}>
                <option value="">Todos</option>
                {/*opciones.estados.map(e => <option key={e} value={e}>{e}</option>)*/}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {alumnos.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {alumnos.map((alumno) => (
            <tr key={alumno.id}>
              <td className="fila-tabla-alumno">{alumno.nombre} {alumno.apellido}</td>
              <td className="fila-tabla-alumno text-center">{alumno.correo}</td>
              <td className="fila-tabla-alumno text-center">{alumno.universidad}</td>
              <td className="fila-tabla-alumno text-center">{alumno.fecha_inicio_estudios}</td>
              <td className="fila-tabla-alumno text-center"></td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-alumnos/${alumno.id}`}>Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="pagination" style={{ marginTop: '20px' }}>
        {pagination.map((link, i) => {
          // Traducción de etiquetas
          let label = link.label
          .replace(/Previous/i, 'Anterior')
          .replace(/Next/i, 'Próximo');

          return (
            <button
              key={i}
              disabled={!link.url || link.active}
              onClick={() => handlePaginacion(link.url)}
              dangerouslySetInnerHTML={{ __html: label }}
              style={{
                marginRight: '6px',
                padding: '4px 10px',
                backgroundColor: link.active ? '#007bff' : '#eaeaea',
                color: link.active ? '#fff' : '#333',
                border: '1px solid #ccc',
                borderRadius: '4px',
                cursor: link.url ? 'pointer' : 'default'
              }}
            />
          );
        })}
      </div>
    </AppLayout>
  );
};

export default Alumnos;


