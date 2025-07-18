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
        'fecha_inscripcion',
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
        'fecha_inicio_estudios',
        'estado_postulacion',
        'carrera_principal',
        'materia_principal_1',
        'materia_principal_2',
        'materia_principal_3',
        'materia_optativa_1',
        'materia_optativa_2',
        'fecha_final_estudios'
    ];
}
