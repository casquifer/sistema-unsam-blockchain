<?php

namespace App\Modules\Pime\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Pime\Models\Pime;
use Illuminate\Http\Request;

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
}
