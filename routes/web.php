<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\PimeDashboardController;
use App\Http\Controllers\UniversidadDashboardController;
use App\Http\Controllers\EstudianteDashboardController;

use Modules\Alumno\Controllers\AlumnoController;
use Modules\Pime\Controllers\PimeController;
use Modules\Universidad\Controllers\UniversidadController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->get('/dashboard', function () {
    $role = auth()->user()->role;

    if (!in_array($role, ['pime', 'universidad', 'estudiante'])) {
        abort(403, 'Rol no autorizado o no definido.');
    }

    return redirect()->route($role . '.dashboard');
})->name('dashboard');


// Rutas por rol
//Route::middleware(['auth', 'role:pime'])->get('/pime/dashboard', PimeDashboardController::class)->name('dashboard.pime');
Route::middleware(['auth', 'role:universidad'])->get('/universidad/dashboard', UniversidadDashboardController::class)->name('dashboard.universidad');
Route::middleware(['auth', 'role:estudiante'])->get('/estudiante/dashboard', EstudianteDashboardController::class)->name('dashboard.estudiante');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/info-usuario', [ProfileController::class, 'informacion']);

});

require __DIR__.'/auth.php';
require base_path('/Modules/Pime/routes/web.php');
