<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class Postulacion extends Model {

    protected $table = 'postulaciones';

    protected $fillable = [
        'alumno_id',
        'periodo_inicio_id',
        'periodo_fin_id',
        'carrera_principal',
        'estado',
    ];

    public function alumno() {
        return $this->belongsTo(Alumno::class);
    }
    public function periodoInicio()
    {
        return $this->belongsTo(Periodo::class, 'periodo_inicio_id');
    }

    public function periodoFin()
    {
        return $this->belongsTo(Periodo::class, 'periodo_fin_id');
    }
}
