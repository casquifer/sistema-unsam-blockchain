import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

// Helper: formatea "2026-08-03T00:00:00.000000Z" -> "03/08/2026"
// Evita problemas de zona horaria tomando solo la parte de fecha.
const formatFecha = (iso) => {
  if (!iso) return '';
  const s = String(iso);
  const datePart = s.slice(0, 10); // "YYYY-MM-DD"
  const [y, m, d] = datePart.split('-');
  if (!y || !m || !d) return s;
  return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
};

const periodos = () => {
  const { post } = useForm({});
  const [periodos, setperiodos] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '', fecha_inicio: '', fecha_fin: '',
  });
  const [opciones, setOpciones] = useState({
    nombre: [], fecha_inicio: [], fecha_fin: []
  });

  useEffect(() => {
    fetch('/pime/periodos-filtrados')
      .then(res => res.json())
      .then(data => {
        setperiodos(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));

    fetch('/pime/periodos-opciones')
      .then(res => res.json())
      .then(setOpciones)
      .catch(err => console.error(err));
  }, []);

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/periodos-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setperiodos(data.data);
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
        setperiodos(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 className="titulos">Gestión de Periodos</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de periodos.</p>

      <div style={{ height: '50px' }}></div>

      <div className='contenedor-ingresar'>
        <h1 className="titulos">Ingresar un Periodo</h1>
        <Link href="/pime/ingresar-periodo" className="ingresar-btn">+</Link>
      </div>

      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Periodos</h1>

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
              Fecha Inicio<br />
              <select
                value={filters.fecha_inicio}
                onChange={(e) => handleChange('fecha_inicio', e.target.value)}
              >
                <option value="">Todos</option>
                {opciones.fecha_inicio.map((c) => (
                  // value = ISO original para que el backend filtre bien
                  <option key={c} value={c}>{formatFecha(c)}</option>
                ))}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Fecha Fin<br />
              <select
                value={filters.fecha_fin}
                onChange={(e) => handleChange('fecha_fin', e.target.value)}
              >
                <option value="">Todas</option>
                {opciones.fecha_fin.map((u) => (
                  <option key={u} value={u}>{formatFecha(u)}</option>
                ))}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {periodos.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {periodos.map((periodo) => (
            <tr key={periodo.id}>
              <td className="fila-tabla-alumno">{periodo.nombre}</td>
              {/* Mostramos formateado, sin tocar el valor original */}
              <td className="fila-tabla-alumno text-center">{formatFecha(periodo.fecha_inicio)}</td>
              <td className="fila-tabla-alumno text-center">{formatFecha(periodo.fecha_fin)}</td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-periodo/${periodo.id}`}>Ver</Link>
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

export default periodos;



