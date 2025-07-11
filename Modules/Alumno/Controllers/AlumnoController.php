<?php

namespace App\Modules\Alumno\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Alumno\Models\Alumno;
use Illuminate\Http\Request;

class AlumnoController extends Controller
{
    public function index()
    {
        return Alumno::all();
    }

    public function store(Request $request)
    {
        $alumno = Alumno::create($request->all());
        return response()->json($alumno, 201);
    }

    public function show($id)
    {
        return Alumno::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $alumno = Alumno::findOrFail($id);
        $alumno->update($request->all());
        return response()->json($alumno);
    }

    public function destroy($id)
    {
        Alumno::destroy($id);
        return response()->json(null, 204);
    }
}
