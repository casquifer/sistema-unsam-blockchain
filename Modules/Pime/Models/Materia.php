<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $table = 'materias';

    protected $fillable = [
        'nombre_materia',
        'codigo_materia',
        'escuela',
        'plan',
    ];
}
