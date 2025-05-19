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
        Schema::create('alumnos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable()->index(); // Índice para búsqueda
            $table->string('apellido')->nullable();
            $table->string('pais')->nullable()->index();   // Índice para filtro
            $table->string('universidad')->nullable()->index(); // Índice para filtro
            $table->string('sede_universidad')->nullable();
            $table->string('carrera')->nullable()->index(); // Índice para filtro
            $table->string('nivel_academico')->nullable();
            $table->string('responsable_intercambio')->nullable();
            $table->integer('anio_carrera')->nullable();
            $table->string('nivel_espaniol')->nullable();
            $table->string('correo')->nullable()->unique(); // Índice único
            $table->string('correo_alternativo')->nullable();
            $table->date('fecha_inscripcion')->nullable();
            $table->string('genero')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->string('nacionalidad')->nullable();
            $table->integer('documento')->nullable()->unique(); // Índice único
            $table->integer('pasaporte')->nullable()->unique(); // Índice único
            $table->integer('telefono')->nullable();
            $table->text('direccion')->nullable();       // Campo de texto más amplio
            $table->text('contacto_emergencia')->nullable(); // Campo de texto más amplio
            $table->integer('telefono_emergencia')->nullable();
            $table->text('condicion_especial')->nullable(); // Campo de texto más amplio
            $table->date('fecha_inicio_estudios')->nullable();
            $table->date('fecha_final_estudios')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('alumnos');
    }
};