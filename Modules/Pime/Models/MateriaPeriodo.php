<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class MateriaPeriodo extends Model
{
    protected $table = 'materia_periodo';

    protected $fillable = [
        'materia_id',
        'alumno_id',
        'periodo_id',
        'materia_tipo',            // principal | optativa (u otros)
        'materia_estado',          // abandono | anotado | cursando | promociono | reprobo | rinde_final
        'acceso_campus_virtual',   // ingreso | no_ingreso | no_tiene
        'fecha_examen_final',
    ];

    /** Cada registro pertenece a un período */
    public function periodo()
    {
        return $this->belongsTo(Periodo::class);
    }

    /** Cada registro pertenece a una materia */
    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    /** Cada registro pertenece a un alumno */
    public function alumno()
    {
        return $this->belongsTo(Alumno::class);
    }
}
