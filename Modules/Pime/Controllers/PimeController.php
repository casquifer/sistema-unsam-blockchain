<?php

namespace Modules\Pime\Controllers;

use App\Http\Controllers\Controller;

use Modules\Pime\Models\Pime;
use Modules\Pime\Models\Materia;
use Modules\Alumno\Models\Alumno;

use Illuminate\Http\Request;
use Inertia\Inertia;




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
            'pais' => 'nullable|string|max:255',
            'universidad' => 'nullable|string|max:255',
            'sede_universidad' => 'nullable|string|max:255',
            'carrera' => 'nullable|string|max:255',
            'nivel_academico' => 'nullable|string|max:255',
            'responsable_intercambio' => 'nullable|string|max:255',
            'anio_carrera' => 'nullable|integer',
            'nivel_espaniol' => 'nullable|string|max:255',
            'correo' => 'required|email|max:255|unique:alumnos,correo,',
            'correo_alternativo' => 'nullable|email|max:255',
            'fecha_inscripcion' => 'nullable|date',
            'genero' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'nacionalidad' => 'nullable|string|max:255',
            'documento' => 'nullable|integer|unique:alumnos,documento,',
            'pasaporte' => 'nullable|integer|unique:alumnos,pasaporte,',
            'telefono' => 'nullable|integer',
            'direccion' => 'nullable|string',
            'contacto_emergencia' => 'nullable|string',
            'telefono_emergencia' => 'nullable|integer',
            'condicion_especial' => 'nullable|string',
            'fecha_inicio_estudios' => 'nullable|date',
            'estado_postulacion' => 'nullable|string|max:255',
            'fecha_final_estudios' => 'nullable|date',
        ]);
        

        // Guardar en la base de datos
        $this->crearAlumno($validated);

        return redirect()->route('pime.alumnos')->with('success', 'Alumno guardado correctamente.');
    }

    public function crearAlumno(array $data)
    {
        return Alumno::create($data);
    }

    
    public function ultimosAlumnos()
    {
        return response()->json(Alumno::all());
    } 

    public function perfilAlumnos($id)
    {
        $alumno = Alumno::findOrFail($id);

        return Inertia::render('Pime/PerfilAlumnos', [
            'alumno' => $alumno
        ]);
    }

    public function actualizarAlumno(Request $request, $id)
    {
        $alumno = Alumno::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'pais' => 'nullable|string|max:255',
            'universidad' => 'nullable|string|max:255',
            'sede_universidad' => 'nullable|string|max:255',
            'carrera' => 'nullable|string|max:255',
            'nivel_academico' => 'nullable|string|max:255',
            'responsable_intercambio' => 'nullable|string|max:255',
            'anio_carrera' => 'nullable|integer',
            'nivel_espaniol' => 'nullable|string|max:255',
            'correo' => 'required|email|max:255',
            'correo_alternativo' => 'nullable|email|max:255',
            'fecha_inscripcion' => 'nullable|date',
            'genero' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'nacionalidad' => 'nullable|string|max:255',
            'documento' => 'nullable|integer',
            'pasaporte' => 'nullable|integer',
            'telefono' => 'nullable|integer',
            'direccion' => 'nullable|string',
            'contacto_emergencia' => 'nullable|string',
            'telefono_emergencia' => 'nullable|integer',
            'condicion_especial' => 'nullable|string',
            'fecha_inicio_estudios' => 'nullable|date',
            'estado_postulacion' => 'nullable|string|max:255',
            'fecha_final_estudios' => 'nullable|date',
        ]);
        

        $alumno->update($validated);

        return redirect()->route('pime.perfil-alumnos', ['id' => $alumno->id])
                 ->with('success', 'Datos actualizados correctamente.');
    }

    public function eliminarAlumno($id)
    {
        $alumno = Alumno::findOrFail($id);
        $alumno->delete();

        return redirect()->route('pime.alumnos')
                        ->with('success', 'Alumno eliminado correctamente.');
    }

    public function opcionesFiltro()
    {
        return response()->json([
            'correos'       => Alumno::select('correo')->orderBy('correo')->pluck('correo')->unique()->values(),
            'universidades' => Alumno::select('universidad')->orderBy('universidad')->pluck('universidad')->unique()->values(),
            'fechas'        => Alumno::select('fecha_inicio_estudios')->orderBy('fecha_inicio_estudios')->pluck('fecha_inicio_estudios')->unique()->values(),
            'estados'       => Alumno::select('estado_postulacion')->orderBy('estado_postulacion')->pluck('estado_postulacion')->unique()->values(),
        ]);
    }

    public function buscarAlumnos(Request $request)
    {
        $q = Alumno::query();

        // Filtro por nombre o apellido (texto)
        if ($s = $request->input('nombre')) {
            $q->where(function ($x) use ($s) {
                $x->where('nombre', 'like', "%$s%")
                ->orWhere('apellido', 'like', "%$s%");
            });
        }

        // Filtros por columna exacta
        foreach ([
            'correo'      => 'correo',
            'universidad' => 'universidad',
            'fecha'       => 'fecha_inicio_estudios',
            'estado'      => 'estado_postulacion',
        ] as $param => $column) {
            if ($value = $request->input($param)) {
                $q->where($column, $value);
            }
        }

        return response()->json(
            $q->latest()->paginate(10)->withQueryString()
        );
    }

    // ********** MATERIAS **********

    public function materias(){
        return Inertia::render('Pime/Materias');
    }

    public function ingresarMateria()
    {
        return Inertia::render('Pime/IngresarMateria');
    }

    public function guardarMateria(Request $request)
    {
        $validated = $request->validate([
            'nombre_materia' => 'required|string|max:255',
            'codigo_materia' => 'required|string|max:255',
            'escuela' => 'required|string|max:255',
            'plan' => 'nullable|string|max:255',
        ]);
        

        // Guardar en la base de datos
        $this->crearMateria($validated);

        return redirect()->route('pime.materias')->with('success', 'Materia guardada correctamente.');
    }

    public function crearMateria(array $data)
    {
        return Materia::create($data);
    }

    public function perfilMaterias($id)
    {
        $materia = Materia::findOrFail($id);

        return Inertia::render('Pime/PerfilMaterias', [
            'materia' => $materia
        ]);
    }

    public function actualizarMaterias(Request $request, $id)
    {
        $materia = Materia::findOrFail($id);

        $validated = $request->validate([
            'nombre_materia' => 'required|string|max:255',
            'codigo_materia' => 'required|string|max:255',
            'escuela' => 'required|string|max:255',
            'plan' => 'nullable|string|max:255',
        ]);
        

        $materia->update($validated);

        return redirect()->route('pime.perfil-materias', ['id' => $materia->id])
                 ->with('success', 'Datos actualizados correctamente.');
    }

    public function eliminarMaterias($id)
    {
        $materia = Materia::findOrFail($id);
        $materia->delete();

        return redirect()->route('pime.materias')
                        ->with('success', 'Materia eliminada correctamente.');
    }

    public function opcionesFiltroMaterias()
    {
        return response()->json([
            'codigo_materia' => Materia::select('codigo_materia')->orderBy('codigo_materia')->pluck('codigo_materia')->unique()->values(),
            'escuela'        => Materia::select('escuela')->orderBy('escuela')->pluck('escuela')->unique()->values(),
            'plan'       => Materia::select('plan')->orderBy('plan')->pluck('plan')->unique()->values(),
        ]);
    }

    public function buscarMaterias(Request $request)
    {
        $q = Materia::query();

        // Filtro por nombre o apellido (texto)
        if ($s = $request->input('nombre_materia')) {
            $q->where(function ($x) use ($s) {
                $x->where('nombre_materia', 'like', "%$s%");
            });
        }

        // Filtros por columna exacta
        foreach ([
            'codigo_materia'      => 'codigo_materia',
            'escuela' => 'escuela',
            'plan'       => 'plan',
        ] as $param => $column) {
            if ($value = $request->input($param)) {
                $q->where($column, $value);
            }
        }

        return response()->json(
            $q->latest()->paginate(10)->withQueryString()
        );
    }

}
