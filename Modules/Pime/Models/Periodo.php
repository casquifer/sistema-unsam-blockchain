<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class Periodo extends Model
{
    protected $table = 'periodos';

    protected $fillable = [
        'nombre',
        'fecha_inicio',
        'fecha_fin',
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin'    => 'date',
    ];

    /** Un período puede tener varias postulaciones */
    public function postulaciones()
    {
        return $this->hasMany(Postulacion::class, 'periodo_id');
    }

    /** Relación directa a filas del pivot enriquecido */
    public function materiasPeriodo()
    {
        return $this->hasMany(MateriaPeriodo::class, 'periodo_id');
    }

    /** Materias dictadas en el período (sin discriminar alumno) */
    public function materias()
    {
        return $this->belongsToMany(Materia::class, 'materia_periodo', 'periodo_id', 'materia_id')
                    ->withPivot(['alumno_id','materia_tipo','materia_estado','acceso_campus_virtual','fecha_examen_final']);
    }

    /** Documentos asociados al período (cualquier alumno) */
    public function documentos()
    {
        return $this->hasMany(DocumentoPostulacion::class, 'periodo_id');
    }
}
