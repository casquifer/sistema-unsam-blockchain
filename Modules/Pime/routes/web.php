<?php

use Illuminate\Support\Facades\Route;
use Modules\Pime\Controllers\PimeDashboardController;
use Modules\Pime\Controllers\PimeController;

Route::middleware(['auth', 'role:pime'])->prefix('pime')->name('pime.')->group(function () {
        Route::get('/dashboard', [PimeDashboardController::class, '__invoke'])->name('dashboard');
        
        Route::get('/alumnos', [PimeController::class, 'alumnos'])->name('alumnos');
        Route::get('/ingresar-alumnos', [PimeController::class, 'ingresarAlumnos'])->name('ingresar-alumnos');
        Route::post('/guardar-alumno', [PimeController::class, 'guardarAlumno'])->name('guardar-alumno');
        Route::get('/ultimos-alumnos', [PimeController::class, 'ultimosAlumnos'])->name('ultimos-alumnos');
        Route::get('/perfil-alumnos/{id}', [PimeController::class, 'perfilAlumnos'])->name('perfil-alumnos');
        Route::patch('/perfil-alumnos/{id}', [PimeController::class, 'actualizarAlumno'])->name('perfil-alumno.actualizar');
        Route::delete('/borrar-perfil-alumnos/{id}', [PimeController::class, 'eliminarAlumno'])->name('perfil-alumno.eliminar');
        

        Route::get('/universidades', [PimeController::class, 'universidades'])->name('universidades');
        Route::get('/convenios', [PimeController::class, 'convenios'])->name('convenios');
        Route::get('/postulaciones', [PimeController::class, 'postulaciones'])->name('postulaciones');
        Route::get('/certificados', [PimeController::class, 'certificados'])->name('certificados');
        Route::get('/notificador', [PimeController::class, 'notificador'])->name('notificador');
        Route::get('/reportes', [PimeController::class, 'reportes'])->name('reportes');
});

