<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Alumno extends Model
{
    use HasFactory;

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
        'fecha_final_estudios',
        'user_id', // clave foránea
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
