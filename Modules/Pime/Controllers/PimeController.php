<?php

namespace Modules\Pime\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Pime\Models\Pime;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Modules\Alumno\Models\Alumno;


class PimeController extends Controller
{
    public function index()
    {
        return Pime::all();
    }

    public function store(Request $request)
    {
        $pime = Pime::create($request->all());
        return response()->json($pime, 201);
    }

    public function show($id)
    {
        return Pime::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $pime = Pime::findOrFail($id);
        $pime->update($request->all());
        return response()->json($pime);
    }

    public function destroy($id)
    {
        Pime::destroy($id);
        return response()->json(null, 204);
    }

    // ********** RUTAS SIDEBAR **********
    public function alumnos()
    {
        return Inertia::render('Pime/Alumnos');
    }

    public function universidades()
    {
        return Inertia::render('Pime/Universidades');
    }

    public function convenios()
    {
        return Inertia::render('Pime/Convenios');
    }

    public function postulaciones()
    {
        return Inertia::render('Pime/Postulaciones');
    }

    public function certificados()
    {
        return Inertia::render('Pime/Certificados');
    }

    public function notificador()
    {
        return Inertia::render('Pime/Notificador');
    }

    public function reportes()
    {
        return Inertia::render('Pime/Reportes');
    }

    // ********** ALUMNOS **********

    public function ingresarAlumnos()
    {
        return Inertia::render('Pime/IngresarAlumnos');
    }

    public function guardarAlumno(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|max:255',
            'correo_alternativo' => 'nullable|email|max:255',
            'universidad' => 'nullable|string|max:255',
            'sede_universidad' => 'nullable|string|max:255',
        ]);

        // Guardar en la base de datos
        $this->crearAlumno($validated);

        return redirect()->route('pime.alumnos')->with('success', 'Alumno guardado correctamente.');
    }

    public function crearAlumno(array $data)
    {
        return Alumno::create($data);
    }

    

}
