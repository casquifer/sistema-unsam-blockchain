<?php

namespace Modules\Universidad\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Universidad extends Model
{
    use HasFactory;

    protected $table = 'universidades';

    protected $fillable = [
        'nombre',
        'pais',
        'nombre_contacto',
        'correo',
        'direccion',
        'tipo_convenio',
        'fecha_alta_convenio',
        'fecha_vencimiento_convenio',
        'extras',
    ];
}
