<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class Pime extends Model
{
    protected $table = 'pimes';

    protected $fillable = [
        'nombre',
        'pais',
        'universidad',
        'coordinador',
        'correo',
        'telefono',
        'direccion'
    ];
}
