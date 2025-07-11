<?php

namespace App\Modules\Universidad\Models;

use Illuminate\Database\Eloquent\Model;

class Universidad extends Model
{
    protected $table = 'universidades';

    protected $fillable = [
        'nombre',
        'pais',
        'ciudad',
        'direccion',
        'telefono',
        'correo',
        'web'
    ];
}
