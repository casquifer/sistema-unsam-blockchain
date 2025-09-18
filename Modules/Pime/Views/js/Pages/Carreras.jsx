import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

const Carreras = () => {
  const { post } = useForm({});
  const [carreras, setCarreras] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    nombre_carrera: '', codigo_carrera: '', escuela_carrera: '',
  });
  const [opciones, setOpciones] = useState({
    nombre_carrera: [], codigo_carrera: [], escuela_carrera: []
  });

  useEffect(() => {
    fetch('/pime/carreras-filtrados')
      .then(res => res.json())
      .then(data => {
        setCarreras(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));

    fetch('/pime/carreras-opciones')
      .then(res => res.json())
      .then(setOpciones)
      .catch(err => console.error(err));
  }, []);

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/carreras-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setCarreras(data.data);
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
        setCarreras(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 className="titulos">Gestión de Carreras</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de carreras.</p>

      <div style={{ height: '50px' }}></div>

      <div className='contenedor-ingresar'>
        <h1 className="titulos">Ingresar una Carrera</h1>
        <Link href="/pime/ingresar-carrera" className="ingresar-btn">+</Link>
      </div>


      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Carreras</h1>

      <table className="table">
        <thead>
          <tr>
            <th className="titulo-tabla-alumnos">
              Nombre<br />
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.nombre_carrera}
                onChange={(e) => handleChange('nombre_carrera', e.target.value)}
              />
            </th>
            <th className="titulo-tabla-alumnos">
              Código<br />
              <select value={filters.codigo_carrera} onChange={(e) => handleChange('codigo_carrera', e.target.value)}>
                <option value="">Todos</option>
                {opciones.codigo_carrera.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Escuela<br />
              <select value={filters.escuela_carrera} onChange={(e) => handleChange('escuela_carrera', e.target.value)}>
                <option value="">Todas</option>
                {opciones.escuela_carrera.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {carreras.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {carreras.map((carrera) => (
            <tr key={carrera.id}>
              <td className="fila-tabla-alumno">{carrera.nombre_carrera}</td>
              <td className="fila-tabla-alumno text-center">{carrera.codigo_carrera}</td>
              <td className="fila-tabla-alumno text-center">{carrera.escuela_carrera}</td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-carreras/${carrera.id}`}>Ver</Link>
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

export default Carreras;


