import React, { useEffect, useState } from 'react';
import AppLayout from '@Pime/Layout/PimeSidebarLayout';
import { Link, useForm } from '@inertiajs/react';

const Universidades = () => {
  const { post } = useForm({});
  const [universidades, setUniversidades] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filters, setFilters] = useState({
    nombre: '', pais: '', nombre_contacto: '', correo: '', direccion: '', tipo_convenio: '', fecha_alta_convenio: '', fecha_vencimiento_convenio: ''
  });
  const [opciones, setOpciones] = useState({
    nombre: '', pais: [], nombre_contacto: [], correo: [], direccion: [], tipo_convenio: [], fecha_alta_convenio: [], fecha_vencimiento_convenio: []
  }); 

  useEffect(() => {
    fetch('/pime/universidades-filtrados')
      .then(res => res.json())
      .then(data => {
        setUniversidades(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));

    fetch('/pime/universidades-opciones')
      .then(res => res.json())
      .then(setOpciones)
      .catch(err => console.error(err));
  }, []);

  const fetchFiltrados = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    fetch(`/pime/universidades-filtrados?${qs}`)
      .then(res => res.json())
      .then(data => {
        setUniversidades(data.data);
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
        setUniversidades(data.data);
        setPagination(data.links);
      })
      .catch(err => console.error(err));
  };

  return (
    <AppLayout>
      <button className="logout-btn" onClick={() => post('/logout')}>Cerrar Sesión</button>
      <h1 className="titulos">Gestión de Universidades</h1>
      <div className="linea-titulos"></div>
      <p>Lista, búsqueda y gestión de universidades.</p>

      <div style={{ height: '50px' }}></div>

      <div className='contenedor-ingresar'>
        <h1 className="titulos">Ingresar una Universidad</h1>
        <Link href="/pime/ingresar-universidad" className="ingresar-btn">+</Link>
      </div>

      <div style={{ height: '50px' }}></div>

      <h1 className="titulos">Listado de Universidades</h1>

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
              Pais<br />
              <select value={filters.pais} onChange={(e) => handleChange('pais', e.target.value)}>
                <option value="">Todos</option>
                {opciones.pais.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Contacto<br />
              <select value={filters.nombre_contacto} onChange={(e) => handleChange('nombre_contacto', e.target.value)}>
                <option value="">Todas</option>
                {opciones.nombre_contacto.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Correo<br />
              <select value={filters.correo} onChange={(e) => handleChange('correo', e.target.value)}>
                <option value="">Todas</option>
                {opciones.correo.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">
              Tipo Convenio<br />
              <select value={filters.tipo_convenio} onChange={(e) => handleChange('tipo_convenio', e.target.value)}>
                <option value="">Todas</option>
                {opciones.tipo_convenio.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </th>
            
            <th className="titulo-tabla-alumnos">
              Baja Convenio<br />
              <select value={filters.fecha_vencimiento_convenio} onChange={(e) => handleChange('fecha_vencimiento_convenio', e.target.value)}>
                <option value="">Todas</option>
                {opciones.fecha_vencimiento_convenio.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </th>
            <th className="titulo-tabla-alumnos">Perfil</th>
          </tr>
        </thead>

        <tbody>
          {universidades.length === 0 && (
            <tr><td colSpan="6" className="text-center">Sin resultados.</td></tr>
          )}
          {universidades.map((universidad) => (
            <tr key={universidad.id}>
              <td className="fila-tabla-alumno">{universidad.nombre}</td>
              <td className="fila-tabla-alumno text-center">{universidad.pais}</td>
              <td className="fila-tabla-alumno text-center">{universidad.nombre_contacto}</td>
              <td className="fila-tabla-alumno text-center">{universidad.correo}</td>
              <td className="fila-tabla-alumno text-center">{universidad.tipo_convenio}</td>
              <td className="fila-tabla-alumno text-center">{universidad.fecha_vencimiento_convenio}</td>
              <td className="fila-tabla-alumno text-center">
                <Link href={`/pime/perfil-universidades/${universidad.id}`}>Ver</Link>
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

export default Universidades;
