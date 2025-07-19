<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class Convenio extends Model
{
    protected $table = 'convenios';

    protected $fillable = [
        'nombre',
        'tipo',
        'observaciones',
    ];
}
