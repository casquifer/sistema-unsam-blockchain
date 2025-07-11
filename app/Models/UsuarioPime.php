<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UsuarioPime extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'apellido',
        'dni',
        'correo',
        'fecha_ingreso_unsam',
        'rol',
        'user_id', // clave foránea
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
