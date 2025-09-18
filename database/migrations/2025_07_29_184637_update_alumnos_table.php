<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {

            // 🔴 1. Eliminar el campo que no usas más
            if (Schema::hasColumn('alumnos', 'fecha_inscripcion')) {
                $table->dropColumn('fecha_inscripcion');
            }

            // 🟢 2. Agregar campos después de materia_principal_1
            $table->string('estado_mp1')->nullable()->after('materia_principal_1');
            $table->string('acceso_virtual_mp1')->nullable()->after('estado_mp1');
            $table->date('fecha_final_mp1')->nullable()->after('acceso_virtual_mp1');

            // 🟢 Después de materia_principal_2
            $table->string('estado_mp2')->nullable()->after('materia_principal_2');
            $table->string('acceso_virtual_mp2')->nullable()->after('estado_mp2');
            $table->date('fecha_final_mp2')->nullable()->after('acceso_virtual_mp2');

            // 🟢 Después de materia_principal_3
            $table->string('estado_mp3')->nullable()->after('materia_principal_3');
            $table->string('acceso_virtual_mp3')->nullable()->after('estado_mp3');
            $table->date('fecha_final_mp3')->nullable()->after('acceso_virtual_mp3');

            // 🟢 Después de materia_optativa_1
            $table->string('estado_mo1')->nullable()->after('materia_optativa_1');
            $table->string('acceso_virtual_mo1')->nullable()->after('estado_mo1');
            $table->date('fecha_final_mo1')->nullable()->after('acceso_virtual_mo1');

            // 🟢 Después de materia_optativa_2
            $table->string('estado_mo2')->nullable()->after('materia_optativa_2');
            $table->string('acceso_virtual_mo2')->nullable()->after('estado_mo2');
            $table->date('fecha_final_mo2')->nullable()->after('acceso_virtual_mo2');

            // 📌 Campos para el segundo ciclo
            $table->date('fecha_inicio_estudios_ciclo2')->nullable()->after('fecha_final_mo2');
            $table->date('fecha_final_estudios_ciclo2')->nullable()->after('fecha_inicio_estudios_ciclo2');
            $table->string('carrera_principal_ciclo2')->nullable()->after('fecha_final_estudios_ciclo2');

            // Materias del segundo ciclo
            $table->string('materia_principal_1_ciclo2')->nullable()->after('carrera_principal_ciclo2');
            $table->string('estado_mp1_ciclo2')->nullable()->after('materia_principal_1_ciclo2');
            $table->string('acceso_virtual_mp1_ciclo2')->nullable()->after('estado_mp1_ciclo2');
            $table->date('fecha_final_mp1_ciclo2')->nullable()->after('acceso_virtual_mp1_ciclo2');

            $table->string('materia_principal_2_ciclo2')->nullable()->after('fecha_final_mp1_ciclo2');
            $table->string('estado_mp2_ciclo2')->nullable()->after('materia_principal_2_ciclo2');
            $table->string('acceso_virtual_mp2_ciclo2')->nullable()->after('estado_mp2_ciclo2');
            $table->date('fecha_final_mp2_ciclo2')->nullable()->after('acceso_virtual_mp2_ciclo2');

            $table->string('materia_principal_3_ciclo2')->nullable()->after('fecha_final_mp2_ciclo2');
            $table->string('estado_mp3_ciclo2')->nullable()->after('materia_principal_3_ciclo2');
            $table->string('acceso_virtual_mp3_ciclo2')->nullable()->after('estado_mp3_ciclo2');
            $table->date('fecha_final_mp3_ciclo2')->nullable()->after('acceso_virtual_mp3_ciclo2');

            $table->string('materia_optativa_1_ciclo2')->nullable()->after('fecha_final_mp3_ciclo2');
            $table->string('estado_mo1_ciclo2')->nullable()->after('materia_optativa_1_ciclo2');
            $table->string('acceso_virtual_mo1_ciclo2')->nullable()->after('estado_mo1_ciclo2');
            $table->date('fecha_final_mo1_ciclo2')->nullable()->after('acceso_virtual_mo1_ciclo2');

            $table->string('materia_optativa_2_ciclo2')->nullable()->after('fecha_final_mo1_ciclo2');
            $table->string('estado_mo2_ciclo2')->nullable()->after('materia_optativa_2_ciclo2');
            $table->string('acceso_virtual_mo2_ciclo2')->nullable()->after('estado_mo2_ciclo2');
            $table->date('fecha_final_mo2_ciclo2')->nullable()->after('acceso_virtual_mo2_ciclo2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            // volver a crear fecha_inscripcion
            $table->date('fecha_inscripcion')->nullable();

            // eliminar todos los campos que agregamos
            $table->dropColumn([
                'estado_mp1','acceso_virtual_mp1','fecha_final_mp1',
                'estado_mp2','acceso_virtual_mp2','fecha_final_mp2',
                'estado_mp3','acceso_virtual_mp3','fecha_final_mp3',
                'estado_mo1','acceso_virtual_mo1','fecha_final_mo1',
                'estado_mo2','acceso_virtual_mo2','fecha_final_mo2',
                'fecha_inicio_estudios_ciclo2','fecha_final_estudios_ciclo2','carrera_principal_ciclo2',
                'materia_principal_1_ciclo2','estado_mp1_ciclo2','acceso_virtual_mp1_ciclo2','fecha_final_mp1_ciclo2',
                'materia_principal_2_ciclo2','estado_mp2_ciclo2','acceso_virtual_mp2_ciclo2','fecha_final_mp2_ciclo2',
                'materia_principal_3_ciclo2','estado_mp3_ciclo2','acceso_virtual_mp3_ciclo2','fecha_final_mp3_ciclo2',
                'materia_optativa_1_ciclo2','estado_mo1_ciclo2','acceso_virtual_mo1_ciclo2','fecha_final_mo1_ciclo2',
                'materia_optativa_2_ciclo2','estado_mo2_ciclo2','acceso_virtual_mo2_ciclo2','fecha_final_mo2_ciclo2'
            ]);
        });
    }
};
