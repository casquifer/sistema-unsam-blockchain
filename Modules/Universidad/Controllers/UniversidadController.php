<?php

namespace App\Modules\Universidad\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Universidad\Models\Universidad;
use Illuminate\Http\Request;

class UniversidadController extends Controller
{
    public function index()
    {
        return Universidad::all();
    }

    public function store(Request $request)
    {
        $universidad = Universidad::create($request->all());
        return response()->json($universidad, 201);
    }

    public function show($id)
    {
        return Universidad::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $universidad = Universidad::findOrFail($id);
        $universidad->update($request->all());
        return response()->json($universidad);
    }

    public function destroy($id)
    {
        Universidad::destroy($id);
        return response()->json(null, 204);
    }
}
