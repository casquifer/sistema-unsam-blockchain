import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

const Postulaciones = () => {
  const { post } = useForm({});
  const [postulacion, setPostulacion] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    alumno_id: '', periodo_inicio_id: '', periodo_fin_id: '', carrera_principal: '', estado: ''
  });
  const [opciones, setOpciones] = useState({
    alumno_id: [], periodo_inicio_id: [], periodo_fin_id: [], carrera_principal: [], estado: []
  });

  useEffect(() => {
    fetch('/pime/postulacion-filtrados')
      .then(res => res.json())
      .then(data => {
        setPostulacion(data.data || []);
        setPagination(data.links || []);
      })
      .catch(console.error);
  
    fetch('/pime/postulacion-opciones')
      .then(res => res.json())
      .then((data) => {
        const src = data?.data ?? data ?? {};
        setOpciones({
          alumno_id: src.alumno_id ?? [],
          periodo_inicio_id: src.periodo_inicio_id ?? [],
          periodo_fin_id: src.periodo_fin_id ?? [],
          carrera_principal: src.carrera_principal ?? [],
          estado: src.estado ?? [],
        });
      })
      .catch(console.error);
  }, []);
  

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/postulacion-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setPostulacion(data.data || []);
        setPagination(data.links || []);
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
        setPostulacion(data.data || []);
        setPagination(data.links || []);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 className="titulos">Gestión de Postulaciones</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de postulaciones.</p>

      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Postulaciones</h1>

      <table className="table">
        <thead>
          <tr>
            <th className="titulo-tabla-alumnos">
              Alumno<br />
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.alumno_id}
                onChange={(e) => handleChange('alumno_id', e.target.value)}
              />
            </th>
            <th className="titulo-tabla-alumnos">
              Periodo Inicio<br />
              <select value={filters.periodo_inicio_id} onChange={(e) => handleChange('periodo_inicio_id', e.target.value)}>
                <option value="">Todos</option>
                {opciones.periodo_inicio_id.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Periodo Fin<br />
              <select value={filters.periodo_fin_id} onChange={(e) => handleChange('periodo_fin_id', e.target.value)}>
                <option value="">Todos</option>
                {opciones.periodo_fin_id.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Carrera<br />
              <select value={filters.carrera_principal} onChange={(e) => handleChange('carrera_principal', e.target.value)}>
                <option value="">Todos</option>
                {opciones.carrera_principal.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Estado<br />
              <select value={filters.estado} onChange={(e) => handleChange('estado', e.target.value)}>
                <option value="">Todos</option>
                {opciones.estado.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>           
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {postulacion.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {postulacion.map((postul) => (
            <tr key={postul.id}>
              <td className="fila-tabla-alumno">{postul.alumno_id}</td>
              <td className="fila-tabla-alumno text-center">{postul.periodo_inicio_id}</td>
              <td className="fila-tabla-alumno text-center">{postul.periodo_fin_id}</td>
              <td className="fila-tabla-alumno text-center">{postul.carrera_principal}</td>
              <td className="fila-tabla-alumno text-center">{postul.estado}</td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-postulacion/${postul.id}`}>Ver</Link>
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

export default Postulaciones;
