<?php

namespace Modules\Pime\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentoPostulacion extends Model
{
    protected $table = 'documentos_postulacion';

    protected $fillable = [
        'alumno_id',
        'periodo_id',
        'nombre',
        'ruta',
    ];

    public function alumno()
    {
        return $this->belongsTo(Alumno::class);
    }

    public function periodo()
    {
        return $this->belongsTo(Periodo::class);
    }
}
