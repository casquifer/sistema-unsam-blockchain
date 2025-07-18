<?php

use Illuminate\Support\Facades\Route;
use Modules\Pime\Controllers\PimeDashboardController;
use Modules\Pime\Controllers\PimeController;

Route::middleware(['auth', 'role:pime'])->prefix('pime')->name('pime.')->group(function () {
        Route::get('/dashboard', [PimeDashboardController::class, '__invoke'])->name('dashboard');
        
        //Alumnos
        Route::get('/alumnos', [PimeController::class, 'alumnos'])->name('alumnos');
        Route::get('/ingresar-alumnos', [PimeController::class, 'ingresarAlumnos'])->name('ingresar-alumnos');
        Route::post('/guardar-alumno', [PimeController::class, 'guardarAlumno'])->name('guardar-alumno');
        Route::get('/ultimos-alumnos', [PimeController::class, 'ultimosAlumnos'])->name('ultimos-alumnos');
        Route::get('/perfil-alumnos/{id}', [PimeController::class, 'perfilAlumnos'])->name('perfil-alumnos');
        Route::patch('/perfil-alumnos-actualizar/{id}', [PimeController::class, 'actualizarAlumno'])->name('perfil-alumno.actualizar');
        Route::delete('/borrar-perfil-alumnos/{id}', [PimeController::class, 'eliminarAlumno'])->name('perfil-alumno.eliminar');
        // Alumnos filtro y búsqueda
        Route::get('/alumnos-opciones', [PimeController::class, 'opcionesFiltro'])->name('alumnos.opciones');
        Route::get('/alumnos-filtrados', [PimeController::class, 'buscarAlumnos'])->name('alumnos.filtrados');

        // Materias
        Route::get('/materias', [PimeController::class, 'materias'])->name('materias');
        Route::get('/ingresar-materia', [PimeController::class, 'ingresarMateria'])->name('ingresar-materia');
        Route::post('/guardar-materia', [PimeController::class, 'guardarMateria'])->name('guardar-materia');
        Route::get('/perfil-materias/{id}', [PimeController::class, 'perfilMaterias'])->name('perfil-materias');
        Route::patch('/perfil-materias-actualizar/{id}', [PimeController::class, 'actualizarMaterias'])->name('perfil-materias.actualizar');
        Route::delete('/borrar-perfil-materias/{id}', [PimeController::class, 'eliminarMaterias'])->name('perfil-materias.eliminar');
        // Materias filtro y búsqueda
        Route::get('/materias-todas', [PimeController::class, 'materiasTodas'])->name('materias.todas');
        Route::get('/materias-opciones', [PimeController::class, 'opcionesFiltroMaterias'])->name('materias.opciones');
        Route::get('/materias-filtrados', [PimeController::class, 'buscarMaterias'])->name('materias.filtrados');

        // Carreras
        Route::get('/carreras', [PimeController::class, 'carreras'])->name('carreras');
        Route::get('/ingresar-carrera', [PimeController::class, 'ingresarCarrera'])->name('ingresar-carrera');
        Route::post('/guardar-carrera', [PimeController::class, 'guardarCarrera'])->name('guardar-carrera');
        Route::get('/perfil-carreras/{id}', [PimeController::class, 'perfilCarreras'])->name('perfil-carreras');
        Route::patch('/perfil-carreras-actualizar/{id}', [PimeController::class, 'actualizarCarrera'])->name('perfil-carreras.actualizar');
        Route::delete('/borrar-perfil-carreras/{id}', [PimeController::class, 'eliminarCarrera'])->name('perfil-carreras.eliminar');
        // Carreras filtro y búsqueda
        Route::get('/carreras-todas', [PimeController::class, 'CarrerasTodas'])->name('carreras.todas');
        Route::get('/carreras-filtrados', [PimeController::class, 'buscarCarreras'])->name('carreras.filtradas');
        Route::get('/carreras-opciones', [PimeController::class, 'opcionesFiltroCarreras'])->name('carreras.opciones');

        // Universidades
        Route::get('/universidades', [PimeController::class, 'universidades'])->name('universidades');
        Route::get('/ingresar-universidad', [PimeController::class, 'ingresarUniversidad'])->name('ingresar-universidad');
        Route::post('/guardar-universidad', [PimeController::class, 'guardarUniversidad'])->name('guardar-universidad');
        Route::get('/perfil-universidades/{id}', [PimeController::class, 'perfilUniversidades'])->name('perfil-universidades');
        Route::patch('/perfil-universidades-actualizar/{id}', [PimeController::class, 'actualizarUniversidad'])->name('perfil-universidades.actualizar');
        Route::delete('/borrar-perfil-universidad/{id}', [PimeController::class, 'eliminarUniversidad'])->name('perfil-universidades.eliminar');
        // Universidades filtro y búsqueda
        Route::get('/universidades-todas', [PimeController::class, 'UniversidadesTodas'])->name('universidades.todas');
        Route::get('/universidades-filtrados', [PimeController::class, 'buscarUniversidades'])->name('universidades.filtradas');
        Route::get('/universidades-opciones', [PimeController::class, 'opcionesFiltroUniversidades'])->name('universidades.opciones');

        Route::get('/convenios', [PimeController::class, 'convenios'])->name('convenios');
        Route::get('/postulaciones', [PimeController::class, 'postulaciones'])->name('postulaciones');
        Route::get('/certificados', [PimeController::class, 'certificados'])->name('certificados');
        Route::get('/notificador', [PimeController::class, 'notificador'])->name('notificador');
        Route::get('/reportes', [PimeController::class, 'reportes'])->name('reportes');
});

