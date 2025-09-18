<?php

namespace Modules\Alumno\Models;

use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    protected $table = 'alumnos';

    protected $fillable = [
        'nombre',
        'apellido',
        'pais',
        'universidad',
        'sede_universidad',
        'carrera',
        'nivel_academico',
        'responsable_intercambio',
        'anio_carrera',
        'nivel_espaniol',
        'correo',
        'correo_alternativo',
        'genero',
        'fecha_nacimiento',
        'nacionalidad',
        'documento',
        'pasaporte',
        'telefono',
        'direccion',
        'contacto_emergencia',
        'telefono_emergencia',
        'condicion_especial',
    ];
}
