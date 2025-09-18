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
                'materia_optativa_2_ciclo2','estado_mo2_ciclo2','acceso_virtual_mo2_ciclo2','fecha_final_mo2_ciclo2',
                'archivo_pasaporte','archivo_visa','archivo_analitico','archivo_idioma','archivo_carta_recomendacion','archivo_cv'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            // NOTA: debes volver a agregar los campos con el tipo correcto si quieres restaurarlos
            $table->string('estado_mp1')->nullable();
            $table->string('acceso_virtual_mp1')->nullable();
            $table->date('fecha_final_mp1')->nullable();
            
            $table->string('estado_mp2')->nullable();
            $table->string('acceso_virtual_mp2')->nullable();
            $table->date('fecha_final_mp2')->nullable();
            
            $table->string('estado_mp3')->nullable();
            $table->string('acceso_virtual_mp3')->nullable();
            $table->date('fecha_final_mp3')->nullable();
            
            $table->string('estado_mo1')->nullable();
            $table->string('acceso_virtual_mo1')->nullable();
            $table->date('fecha_final_mo1')->nullable();
            
            $table->string('estado_mo2')->nullable();
            $table->string('acceso_virtual_mo2')->nullable();
            $table->date('fecha_final_mo2')->nullable();
            
            $table->date('fecha_inicio_estudios_ciclo2')->nullable();
            $table->date('fecha_final_estudios_ciclo2')->nullable();
            $table->string('carrera_principal_ciclo2')->nullable();
            
            $table->string('materia_principal_1_ciclo2')->nullable();
            $table->string('estado_mp1_ciclo2')->nullable();
            $table->string('acceso_virtual_mp1_ciclo2')->nullable();
            $table->date('fecha_final_mp1_ciclo2')->nullable();
            
            $table->string('materia_principal_2_ciclo2')->nullable();
            $table->string('estado_mp2_ciclo2')->nullable();
            $table->string('acceso_virtual_mp2_ciclo2')->nullable();
            $table->date('fecha_final_mp2_ciclo2')->nullable();
            
            $table->string('materia_principal_3_ciclo2')->nullable();
            $table->string('estado_mp3_ciclo2')->nullable();
            $table->string('acceso_virtual_mp3_ciclo2')->nullable();
            $table->date('fecha_final_mp3_ciclo2')->nullable();
            
            $table->string('materia_optativa_1_ciclo2')->nullable();
            $table->string('estado_mo1_ciclo2')->nullable();
            $table->string('acceso_virtual_mo1_ciclo2')->nullable();
            $table->date('fecha_final_mo1_ciclo2')->nullable();
            
            $table->string('materia_optativa_2_ciclo2')->nullable();
            $table->string('estado_mo2_ciclo2')->nullable();
            $table->string('acceso_virtual_mo2_ciclo2')->nullable();
            $table->date('fecha_final_mo2_ciclo2')->nullable();
            
            $table->string('archivo_pasaporte')->nullable();
            $table->string('archivo_visa')->nullable();
            $table->string('archivo_analitico')->nullable();
            $table->string('archivo_idioma')->nullable();
            $table->string('archivo_carta_recomendacion')->nullable();
            $table->string('archivo_cv')->nullable();
        });
    }
};
