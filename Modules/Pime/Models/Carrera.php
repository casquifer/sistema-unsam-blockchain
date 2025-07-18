<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    protected $table = 'carreras';

    protected $fillable = [
        'nombre_carrera',
        'codigo_carrera',
        'escuela_carrera',
    ];
}
