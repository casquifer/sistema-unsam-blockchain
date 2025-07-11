<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Alumno;
use App\Models\UsuarioPime;
use App\Models\Universidad;

class UsuarioDemoSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Usuario PIME
        $userPime = User::create([
            'nombre' => 'Ana',
            'apellido' => 'García',
            'email' => 'ana.pime@unsam.edu.ar',
            'password' => Hash::make('pime1234'),
            'role' => 'pime'
        ]);

        UsuarioPime::create([
            'nombre' => 'Ana',
            'apellido' => 'García',
            'dni' => 30221123,
            'correo' => 'ana.pime@unsam.edu.ar',
            'fecha_ingreso_unsam' => '2020-03-01',
            'rol' => 'coordinadora',
            'user_id' => $userPime->id
        ]);

        // 2. Alumno
        $userAlumno = User::create([
            'nombre' => 'Lucas',
            'apellido' => 'Martínez',
            'email' => 'lucas.alumno@gmail.com',
            'password' => Hash::make('alumno1234'),
            'role' => 'alumno'
        ]);

        Alumno::create([
            'nombre' => 'Lucas',
            'apellido' => 'Martínez',
            'pais' => 'Argentina',
            'universidad' => 'UNSAM',
            'sede_universidad' => 'San Martín',
            'carrera' => 'Ingeniería Electrónica',
            'nivel_academico' => 'Grado',
            'responsable_intercambio' => 'Dra. Pérez',
            'anio_carrera' => 3,
            'nivel_espaniol' => 'Avanzado',
            'correo' => 'lucas.alumno@gmail.com',
            'correo_alternativo' => 'lucas.martinez@yahoo.com',
            'fecha_inscripcion' => '2023-02-15',
            'genero' => 'Masculino',
            'fecha_nacimiento' => '2000-05-20',
            'nacionalidad' => 'Argentina',
            'documento' => 40332123,
            'pasaporte' => 12345678,
            'telefono' => 1144456677,
            'direccion' => 'Av. Mitre 123, San Martín',
            'contacto_emergencia' => 'María Martínez',
            'telefono_emergencia' => 1144456688,
            'condicion_especial' => null,
            'fecha_inicio_estudios' => '2021-03-01',
            'fecha_final_estudios' => '2025-12-01',
            'user_id' => $userAlumno->id
        ]);

        // 3. Universidad (si la universidad se loguea)
        $userUniversidad = User::create([
            'nombre' => 'Coordinador Internacional',
            'apellido' => 'UdeChile',
            'email' => 'contacto@udechile.cl',
            'password' => Hash::make('universidad123'),
            'role' => 'universidad'
        ]);

        Universidad::create([
            'nombre' => 'Universidad de Chile',
            'pais' => 'Chile',
            'nombre_contacto' => 'Coordinador Internacional',
            'correo' => 'contacto@udechile.cl',
            'direccion' => 'Santiago Centro',
            'tipo_convenio' => 'bilateral',
            'fecha_alta_convenio' => '2022-01-01',
            'fecha_vencimiento_convenio' => '2027-01-01',
            'extras' => 'Convenio con movilidad anual',
            'user_id' => $userUniversidad->id
        ]);
    }
}
