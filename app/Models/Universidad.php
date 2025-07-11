<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Universidad extends Model
{
    use HasFactory;

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
        'user_id', // clave foránea (opcional si hay login por universidad)
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
