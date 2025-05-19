import React, { useState } from 'react';

function BuscarAlumnosForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchField, setSearchField] = useState('nombre');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [resultados, setResultados] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        setError('');
        setResultados([]);

        let queryParams = new URLSearchParams();

        if (searchField === 'rango_fechas') {
            if (fechaInicio && fechaFin) {
                queryParams.append('fecha_inicio', fechaInicio);
                queryParams.append('fecha_fin', fechaFin);
            } else if (fechaInicio) {
                queryParams.append('fecha', fechaInicio);
            } else if (fechaFin) {
                queryParams.append('fecha', fechaFin);
            } else {
                setError('Por favor, selecciona un rango de fechas o una fecha.');
                return;
            }
        } else if (searchTerm) {
            queryParams.append(searchField, searchTerm);
        } else {
            setError('Por favor, introduce un término de búsqueda.');
            return;
        }

        try {
            const response = await fetch(`/api/buscar-alumnos?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Error al realizar la búsqueda.');
                return;
            }

            const data = await response.json();
            setResultados(data.alumnos);
        } catch (err) {
            console.error('Error al buscar alumnos:', err);
            setError('Error de conexión al servidor.');
        }
    };

    return (
        <div>
            <h2>Buscar Alumnos</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label htmlFor="searchField" className="form-label">Buscar por:</label>
                    <select
                        className="form-select"
                        id="searchField"
                        value={searchField}
                        onChange={(e) => setSearchField(e.target.value)}
                    >
                        <option value="nombre">Nombre del Alumno</option>
                        <option value="pais">País</option>
                        <option value="universidad">Universidad</option>
                        <option value="carrera">Carrera</option>
                        <option value="rango_fechas">Rango de Fechas</option>
                    </select>
                </div>

                {searchField !== 'rango_fechas' && (
                    <div className="mb-3">
                        <label htmlFor="searchTerm" className="form-label">Término de Búsqueda:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="searchTerm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={`Buscar por ${searchField}`}
                        />
                    </div>
                )}

                {searchField === 'rango_fechas' && (
                    <div className="mb-3">
                        <label className="form-label">Rango de Fechas:</label>
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Fecha de Inicio"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Fecha de Fin"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                <button type="submit" className="btn btn-primary">Buscar</button>
            </form>

            {resultados.length > 0 && (
                <div className="mt-4">
                    <h3>Resultados de la Búsqueda:</h3>
                    <ul className="list-group">
                        {resultados.map(alumno => (
                            <li key={alumno.id} className="list-group-item">
                                <strong>Nombre:</strong> {alumno.nombre} <br />
                                <strong>País:</strong> {alumno.pais} <br />
                                <strong>Universidad:</strong> {alumno.universidad} <br />
                                <strong>Carrera:</strong> {alumno.carrera} <br />
                                <strong>Fecha de Inscripción:</strong> {alumno.fecha_inscripcion}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BuscarAlumnosForm;