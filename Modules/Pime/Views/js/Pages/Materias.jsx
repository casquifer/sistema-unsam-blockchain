import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

const Materias = () => {
  const { post } = useForm({});
  const [materias, setMaterias] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '', correo: '', universidad: '', fecha: '', estado: ''
  });
  const [opciones, setOpciones] = useState({
    codigo_materia: [], escuela: [], plan: []
  });

  useEffect(() => {
    fetch('/pime/materias-filtrados')
      .then(res => res.json())
      .then(data => {
        setMaterias(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));

    fetch('/pime/materias-opciones')
      .then(res => res.json())
      .then(setOpciones)
      .catch(err => console.error(err));
  }, []);

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/materias-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setMaterias(data.data);
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
        setMaterias(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Logout</button>
      <h1 className="titulos">Gestión de Materias</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de materias.</p>

      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Ingresar una Materia</h1>
      <br></br>
      <Link href="/pime/ingresar-materia" className="ingresar-btn">Ingresar Materia</Link>

      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Materias</h1>

      <table className="table">
        <thead>
          <tr>
            <th className="titulo-tabla-alumnos">
              Nombre Materia<br />
              <input
                type="text"
                placeholder="Buscar..."
                value={filters.nombre_materia}
                onChange={(e) => handleChange('nombre_materia', e.target.value)}
              />
            </th>
            <th className="titulo-tabla-alumnos">
              Código Materia<br />
              <select value={filters.codigo_materia} onChange={(e) => handleChange('codigo_materia', e.target.value)}>
                <option value="">Todos</option>
                {opciones.codigo_materia.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Escuela<br />
              <select value={filters.escuela} onChange={(e) => handleChange('escuela', e.target.value)}>
                <option value="">Todas</option>
                {opciones.escuela.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Plan<br />
              <select value={filters.plan} onChange={(e) => handleChange('plan', e.target.value)}>
                <option value="">Todas</option>
                {opciones.plan.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {materias.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {materias.map((materia) => (
            <tr key={materia.id}>
              <td className="fila-tabla-alumno">{materia.nombre_materia}</td>
              <td className="fila-tabla-alumno text-center">{materia.codigo_materia}</td>
              <td className="fila-tabla-alumno text-center">{materia.escuela}</td>
              <td className="fila-tabla-alumno text-center">{materia.plan}</td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-materias/${materia.id}`}>Ver</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINACIÓN */}
      <div className="pagination" style={{ marginTop: '20px' }}>
        {pagination.map((link, i) => (
          <button
            key={i}
            disabled={!link.url || link.active}
            onClick={() => handlePaginacion(link.url)}
            dangerouslySetInnerHTML={{ __html: link.label }}
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
        ))}
      </div>
    </AppLayout>
  );
};

export default Materias;


