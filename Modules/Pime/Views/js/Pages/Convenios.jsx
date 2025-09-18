import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

const Convenios = () => {
  const { post } = useForm({});
  const [convenios, setConvenios] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '', tipo: ''
  });
  const [opciones, setOpciones] = useState({
    nombre: [], tipo: []
  });

  useEffect(() => {
    fetch('/pime/convenios-filtrados')
      .then(res => res.json())
      .then(data => {
        setConvenios(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));

    fetch('/pime/convenios-opciones')
      .then(res => res.json())
      .then(setOpciones)
      .catch(err => console.error(err));
  }, []);

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/convenios-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setConvenios(data.data);
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
        setConvenios(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 className="titulos">Gestión de Convenios</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de convenios.</p>

      <div style={{ height: '50px' }}></div>

      <div className='contenedor-ingresar'>
        <h1 className="titulos">Ingresar un Convenio</h1>
        <Link href="/pime/ingresar-convenio" className="ingresar-btn">+</Link>
      </div>


      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Convenios</h1>

      <table className="table">
        <thead>
          <tr>
            <th className="titulo-tabla-alumnos">
              Nombre<br />
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
              />
            </th>
            <th className="titulo-tabla-alumnos">
              Tipo<br />
              <select value={filters.tipo} onChange={(e) => handleChange('tipo', e.target.value)}>
                <option value="">Todos</option>
                {opciones.tipo.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>           
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {convenios.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {convenios.map((convenio) => (
            <tr key={convenio.id}>
              <td className="fila-tabla-alumno">{convenio.nombre}</td>
              <td className="fila-tabla-alumno text-center">{convenio.tipo}</td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-convenios/${convenio.id}`}>Ver</Link>
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

export default Convenios;