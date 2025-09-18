<?php

namespace Modules\Pime\Controllers;

use App\Http\Controllers\Controller;


use Inertia\Inertia;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use Modules\Pime\Models\Pime;
use Modules\Pime\Models\Carrera;
use Modules\Pime\Models\Materia;
use Modules\Pime\Models\Convenio;
use Modules\Pime\Models\Postulacion;
use Modules\Pime\Models\Periodo;
use Modules\Pime\Models\MateriaPeriodo;
use Modules\Pime\Models\DocumentoPostulacion;
use Modules\Alumno\Models\Alumno;
use Modules\Universidad\Models\Universidad;



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
            'condicion_especial' => 'nullable|string'
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
            'genero' => 'nullable|string|max:255',
            'fecha_nacimiento' => 'nullable|date',
            'nacionalidad' => 'nullable|string|max:255',
            'documento' => 'nullable|integer',
            'pasaporte' => 'nullable|integer',
            'telefono' => 'nullable|integer',
            'direccion' => 'nullable|string',
            'contacto_emergencia' => 'nullable|string',
            'telefono_emergencia' => 'nullable|integer',
            'condicion_especial' => 'nullable|string'
        ]);

        // Procesar archivos si se subieron
        /*
        $archivos = [
            'archivo_pasaporte',
            'archivo_visa',
            'archivo_analitico',
            'archivo_idioma',
            'archivo_carta_recomendacion',
            'archivo_cv'
        ];

        foreach ($archivos as $campo) {
            if ($request->hasFile($campo)) {
                $file = $request->file($campo);
                $filename = $campo . '.' . $file->getClientOriginalExtension();
                
                // Guardar usando el disco 'public'
                $file->storeAs('archivos_alumnos/' . $alumno->id , $filename, 'public');
                
                // Actualizar el nombre del archivo en BD
                $validated[$campo] = $filename;
            } else {
                // Mantener el archivo actual si no se sube uno nuevo
                $validated[$campo] = $alumno->{$campo};
            }
        }
        */
        
        // ✅ Actualizar alumno
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
            'universidades' => Alumno::select('universidad')->orderBy('universidad')->pluck('universidad')->unique()->values()
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
            'universidad' => 'universidad'
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
            'docente' => 'nullable|string|max:255',
            'horario' => 'nullable|string|max:255',
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
            'docente' => 'nullable|string|max:255',
            'horario' => 'nullable|string|max:255',
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
            'docente'        => Materia::select('docente')->orderBy('docente')->pluck('docente')->unique()->values(),
            'horario'        => Materia::select('horario')->orderBy('horario')->pluck('horario')->unique()->values(),
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
            'docente' => 'docente',
            'horario' => 'horario',
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

    public function materiasTodas()
    {
        $materias = Materia::select('id', 'nombre_materia')->orderBy('nombre_materia')->get();
        return response()->json($materias);
    }

    // ********** CARRERAS **********
    public function carreras()
    {
        return Inertia::render('Pime/Carreras');
    }

    public function ingresarCarrera()
    {
        return Inertia::render('Pime/IngresarCarrera');
    }

    public function guardarCarrera(Request $request)
    {
        $validated = $request->validate([
            'nombre_carrera' => 'required|string|max:255',
            'codigo_carrera' => 'required|string|max:255',
            'escuela_carrera' => 'required|string|max:255',
        ]);

        Carrera::create($validated);

        return redirect()->route('pime.carreras')->with('success', 'Carrera creada correctamente.');
    }

    public function perfilCarreras($id)
    {
        $carrera = Carrera::findOrFail($id);
        return Inertia::render('Pime/PerfilCarreras', compact('carrera'));
    }

    public function actualizarCarrera(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre_carrera' => 'required|string|max:255',
            'codigo_carrera' => 'required|string|max:255',
            'escuela_carrera' => 'required|string|max:255',
        ]);

        Carrera::findOrFail($id)->update($validated);

        return redirect()->route('pime.carreras')->with('success', 'Carrera actualizada correctamente.');
    }

    public function eliminarCarrera($id)
    {
        Carrera::findOrFail($id)->delete();
        return redirect()->route('pime.carreras')->with('success', 'Carrera eliminada.');
    }

    public function carrerasTodas()
    {
        $carreras = Carrera::select('id', 'nombre_carrera')->orderBy('nombre_carrera')->get();
        return response()->json($carreras);
    }

    public function buscarCarreras(Request $request)
    {
        $query = Carrera::query();

        if ($request->filled('nombre_carrera')) {
            $query->where('nombre_carrera', 'like', '%' . $request->nombre_carrera . '%');
        }
        if ($request->filled('codigo_carrera')) {
            $query->where('codigo_carrera', $request->codigo_carrera);
        }
        if ($request->filled('escuela_carrera')) {
            $query->where('escuela_carrera', $request->escuela_carrera);
        }

        $carreras = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return response()->json($carreras);
    }

    public function opcionesFiltroCarreras()
    {
        return response()->json([
            'codigo_carrera' => Carrera::select('codigo_carrera')->distinct()->pluck('codigo_carrera'),
            'escuela_carrera' => Carrera::select('escuela_carrera')->distinct()->pluck('escuela_carrera'),
        ]);
    }

    // ********** UNIVERSIDADES **********
    public function ingresarUniversidad()
    {
        return Inertia::render('Pime/IngresarUniversidad');
    }

    public function guardarUniversidad(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'nombre_contacto' => 'required|string|max:255',
            'correo' => 'required|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'tipo_convenio' => 'required|string|max:255',
            'fecha_alta_convenio' => 'required|string|max:255',
            'fecha_vencimiento_convenio' => 'required|string|max:255',
            'extras' => 'nullable|string|max:255',
        ]);

        Universidad::create($validated);

        return redirect()->route('pime.universidades')->with('success', 'Universidad creada correctamente.');
    }

    public function perfilUniversidades($id)
    {
        $universidad = Universidad::findOrFail($id);
        return Inertia::render('Pime/PerfilUniversidad', compact('universidad'));
    }

    public function actualizarUniversidad(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'pais' => 'required|string|max:255',
            'nombre_contacto' => 'required|string|max:255',
            'correo' => 'required|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'tipo_convenio' => 'required|string|max:255',
            'fecha_alta_convenio' => 'required|string|max:255',
            'fecha_vencimiento_convenio' => 'required|string|max:255',
            'extras' => 'nullable|string|max:255',
        ]);

        Universidad::findOrFail($id)->update($validated);

        return redirect()->route('pime.universidades')->with('success', 'Universidad actualizada correctamente.');
    }

    public function eliminarUniversidad($id)
    {
        Universidad::findOrFail($id)->delete();
        return redirect()->route('pime.universidades')->with('success', 'Universidad eliminada.');
    }

    public function universidadesTodas()
    {
        $universidad = Universidad::select('id', 'nombre')->orderBy('nombre')->get();
        return response()->json($universidad);
    }

    public function buscarUniversidades(Request $request)
    {
        $query = Universidad::query();

        if ($request->filled('nombre')) {
            $query->where('nombre', 'like', '%' . $request->nombre . '%');
        }
        if ($request->filled('pais')) {
            $query->where('pais', $request->pais);
        }
        if ($request->filled('nombre_contacto')) {
            $query->where('nombre_contacto', $request->nombre_contacto);
        }
        if ($request->filled('correo')) {
            $query->where('correo', $request->correo);
        }
        if ($request->filled('tipo_convenio')) {
            $query->where('tipo_convenio', $request->tipo_convenio);
        }
        if ($request->filled('fecha_vencimiento_convenio')) {
            $query->where('fecha_vencimiento_convenio', $request->fecha_vencimiento_convenio);
        }

        $universidad = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return response()->json($universidad);
    }

    public function opcionesFiltroUniversidades()
    {
        return response()->json([
            'pais' => Universidad::select('pais')->distinct()->pluck('pais'),
            'nombre_contacto' => Universidad::select('nombre_contacto')->distinct()->pluck('nombre_contacto'),
            'correo' => Universidad::select('correo')->distinct()->pluck('correo'),
            'tipo_convenio' => Universidad::select('tipo_convenio')->distinct()->pluck('tipo_convenio'),
            'fecha_vencimiento_convenio' => Universidad::select('fecha_vencimiento_convenio')->distinct()->pluck('fecha_vencimiento_convenio'),
        ]);
    }

    // ********** CONVENIOS **********
    public function ingresarConvenio()
    {
        return Inertia::render('Pime/IngresarConvenio');
    }

    public function guardarConvenio(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'observaciones' => 'nullable|string|max:255',
        ]);

        Convenio::create($validated);

        return redirect()->route('pime.convenios')->with('success', 'Convenio creado correctamente.');
    }

    public function perfilConvenios($id)
    {
        $convenio = Convenio::findOrFail($id);
        return Inertia::render('Pime/PerfilConvenios', compact('convenio'));
    }

    public function actualizarConvenio(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|string|max:255',
            'observaciones' => 'nullable|string|max:255',
        ]);

        Convenio::findOrFail($id)->update($validated);

        return redirect()->route('pime.convenios')->with('success', 'Convenio actualizado correctamente.');
    }

    public function eliminarConvenio($id)
    {
        Convenio::findOrFail($id)->delete();
        return redirect()->route('pime.convenios')->with('success', 'Convenio eliminado.');
    }

    public function conveniosTodas()
    {
        return response()->json(Convenio::select('id', 'nombre')->distinct()->get());
    }

    public function buscarConvenios(Request $request)
    {
        $query = Convenio::query();

        if ($request->filled('nombre')) {
            $query->where('nombre', 'like', '%' . $request->nombre . '%');
        }
        if ($request->filled('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        $convenio = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return response()->json($convenio);
    }

    public function opcionesFiltroConvenios()
    {
        return response()->json([
            'tipo' => Convenio::select('tipo')->distinct()->pluck('tipo')
        ]);
    }

    // ********** PERIODOS **********
    public function periodos()
    {
        return Inertia::render('Pime/Periodos');
    }

    public function ingresarPeriodo()
    {
        return Inertia::render('Pime/IngresarPeriodo');
    }

    public function guardarPeriodo(Request $request)
    {
        $validated = $request->validate([
            'nombre' => '',
            'fecha_inicio' => '',
            'fecha_fin' => '',
        ]);

        Periodo::create($validated);

        return redirect()->route('pime.periodos')->with('success', 'Periodo creado correctamente.');
    }

    public function perfilPeriodos($id)
    {
        $periodo = Periodo::findOrFail($id);
        return Inertia::render('Pime/PerfilPeriodos', compact('periodo'));
    }

    public function actualizarPeriodo(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => '',
            'fecha_inicio' => '',
            'fecha_fin' => '',
        ]);

        Periodo::findOrFail($id)->update($validated);

        return redirect()->route('pime.periodos')->with('success', 'Periodo actualizado correctamente.');
    }

    public function eliminarPeriodo($id)
    {
        Periodo::findOrFail($id)->delete();
        return redirect()->route('pime.periodos')->with('success', 'Periodo eliminado.');
    }

    public function periodosTodos()
    {
        $periodos = Periodo::select('id', 'nombre')->orderBy('id')->get();
        return response()->json($periodos);
    }

    public function buscarPeriodos(Request $request)
    {
        $query = Periodo::query();

        if ($request->filled('nombre')) {
            $query->where('nombre', 'like', '%' . $request->nombre . '%');
        }
        if ($request->filled('fecha_inicio')) {
            $query->where('fecha_inicio', $request->fecha_inicio);
        }
        if ($request->filled('fecha_fin')) {
            $query->where('fecha_fin', $request->fecha_fin);
        }

        $periodos = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return response()->json($periodos);
    }

    public function opcionesFiltroPeriodos()
    {
        return response()->json([
            'fecha_inicio' => Periodo::select('fecha_inicio')->distinct()->pluck('fecha_inicio'),
            'fecha_fin' => Periodo::select('fecha_fin')->distinct()->pluck('fecha_fin'),
        ]);
    }

    // ********** POSTULACIONES **********
    public function ingresarPostulacion ($id)
    {
        $alumno = Alumno::findOrFail($id);

        return Inertia::render('Pime/IngresarPostulacion', [
            'alumno' => $alumno
        ]);
    }

    public function crearPostulacion(Request $request)
    {
        // 1) Validar que venga el payload y (opcional) archivos
        $request->validate([
            'payload'     => ['required', 'string'],
            'archivos.*'  => ['file'], // agregá max:, mimetypes: si necesitás
        ]);

        $payload = json_decode($request->input('payload'), true);
        if (!is_array($payload)) {
            return response()->json(['message' => 'Payload inválido'], 422);
        }

        // 2) Validar el contenido del payload
        $v = Validator::make($payload, [
            'alumno_id'          => 'required|integer|exists:alumnos,id',
            'periodo_inicio_id'  => 'required|integer|exists:periodos,id',
            'periodo_fin_id'     => 'nullable|integer|exists:periodos,id',
            'carrera_principal'  => 'nullable|string|max:255',
            'estado'             => 'required|string|max:255',

            'materias'                           => 'array',
            'materias.*.materia_id'              => 'required|integer|exists:materias,id',
            'materias.*.estado'                  => 'required|string|max:255',
            'materias.*.acceso_campus_virtual'   => 'nullable|string|max:255',
            'materias.*.fecha_examen_final'      => 'nullable',
            'materias.*.materia_prioridad'       => 'nullable|string|max:50',
            'materias.*.periodo'                 => 'nullable', 

            'archivos_meta'              => 'array',
            'archivos_meta.*.nombre'     => 'required|string',
            'archivos_meta.*.periodo_id' => 'nullable|integer|exists:periodos,id',
        ]);

        if ($v->fails()) {
            return response()->json(['message' => 'Datos inválidos', 'errors' => $v->errors()], 422);
        }

        // 3) Extraer datos
        $alumnoId        = $payload['alumno_id'];
        $periodoInicioId = $payload['periodo_inicio_id'];
        $periodoFinId    = $payload['periodo_fin_id'] ?? null;
        $carrera         = $payload['carrera_principal'] ?? null;
        $estado          = $payload['estado'];
        $materias        = $payload['materias'] ?? [];
        $archivosMeta    = $payload['archivos_meta'] ?? [];
        $files           = $request->file('archivos', []);

        $storedPaths = [];

        DB::beginTransaction();
        try {
            // 4) Crear la Postulación
            $postulacion = Postulacion::create([
                'alumno_id'         => $alumnoId,
                'periodo_inicio_id' => $periodoInicioId,
                'periodo_fin_id'    => $periodoFinId,
                'carrera_principal' => $carrera,
                'estado'            => $estado,
            ]);

            // 5) Guardar Materias (tabla: materia_periodo)
            $materiasIds = [];
            foreach ($materias as $m) {
                // Si 'periodo' es numérico, úsalo como periodo_id; si no, usar el periodo_inicio de la postulación
                $periodoIdMateria = (isset($m['periodo']) && is_numeric($m['periodo']))
                    ? (int) $m['periodo']
                    : $periodoInicioId;

                $mp = MateriaPeriodo::create([
                    'alumno_id'              => $alumnoId,
                    'periodo_id'             => $periodoIdMateria,
                    'materia_id'             => $m['materia_id'],
                    'materia_estado'         => $m['estado'],
                    'acceso_campus_virtual'  => isset($m['acceso_campus_virtual']) ? (bool)$m['acceso_campus_virtual'] : null,
                    'fecha_examen_final'     => $m['fecha_final'] ?? null,
                    'materia_tipo'           => $m['materia_tipo'] ?? null
                    // 'materia_prioridad'    => ..., // sólo si existe la columna
                ]);

                $materiasIds[] = $mp->id;
            }

            // 6) Guardar Archivos (disk public) + registros en documentos_postulacion
            $baseDir = "postulaciones/{$alumnoId}/{$periodoInicioId}";
            $archivosSaved = [];

            foreach ($files as $i => $file) {
                if (!$file) continue;

                $origName = $file->getClientOriginalName() ?: 'archivo';
                $basename = pathinfo($origName, PATHINFO_FILENAME);
                $ext      = $file->getClientOriginalExtension() ?: 'bin';

                $safeBase = Str::slug($basename, '-');
                if ($safeBase === '') $safeBase = 'archivo';

                $filename = $safeBase . '-' . Str::lower(Str::uuid()) . '.' . strtolower($ext);

                $path = $file->storeAs($baseDir, $filename, 'public'); // storage/app/public/...
                $storedPaths[] = $path;

                // Si en archivos_meta vino un periodo_id por índice, lo respetamos; si no, usamos periodo_inicio_id
                $periodoIdArchivo = data_get($archivosMeta, "{$i}.periodo_id", $periodoInicioId);

                $doc = DocumentoPostulacion::create([
                    'alumno_id' => $alumnoId,
                    'periodo_id'=> $periodoIdArchivo,
                    'nombre'    => $origName, // guardamos nombre original para mostrar
                    'ruta'      => $path,     // ruta relativa en disk 'public'
                ]);

                $archivosSaved[] = [
                    'id'         => $doc->id,
                    'nombre'     => $doc->nombre,
                    'ruta'       => $doc->ruta,
                    'public_url' => Storage::disk('public')->url($path), // /storage/...
                ];
            }

            DB::commit();

            return response()->json([
                'message'         => 'Postulación creada con éxito',
                'postulacion_id'  => $postulacion->id,
                'materias_ids'    => $materiasIds,
                'archivos'        => $archivosSaved,
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            // limpieza de archivos físicos si algo falló
            foreach ($storedPaths as $p) {
                try { Storage::disk('public')->delete($p); } catch (\Throwable $t) {}
            }

            return response()->json([
                'message' => 'No se pudo crear la postulación',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function postulacionTodos()
    {
        $postulacion = Postulacion::select('id', 'alumno_id')->orderBy('id')->get();
        return response()->json($postulacion);
    }

    public function buscarPostulacion(Request $request)
    {
        $query = Postulacion::query();

        if ($request->filled('alumno_id')) {
            $query->where('alumno_id', 'like', '%' . $request->nombre . '%');
        }
        if ($request->filled('periodo_inicio_id')) {
            $query->where('periodo_inicio_id', $request->periodo_inicio_id);
        }
        if ($request->filled('periodo_fin_id')) {
            $query->where('periodo_fin_id', $request->periodo_fin_id);
        }
        if ($request->filled('carrera_principal')) {
            $query->where('carrera_principal', $request->carrera_principal);
        }
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $postulacion = $query->orderBy('id', 'desc')->paginate(10)->withQueryString();

        return response()->json($postulacion);
    }

    public function opcionesFiltroPostulacion()
    {
        return response()->json([
            'periodo_inicio_id' => Postulacion::select('periodo_inicio_id')->distinct()->pluck('periodo_inicio_id'),
            'periodo_fin_id' => Postulacion::select('periodo_fin_id')->distinct()->pluck('periodo_fin_id'),
        ]);
    }

    public function perfilPostulacion($id)
    {
        $postulacion = Postulacion::findOrFail($id);

        $alumno = Alumno::findOrFail($postulacion->alumno_id);


        return Inertia::render('Pime/PerfilPostulacion', [
            'postulacion' => $postulacion,
            'alumno' => $alumno
        ]);
    }
}
