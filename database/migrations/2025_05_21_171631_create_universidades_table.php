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
        Schema::create('universidades', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->nullable()->index(); // Índice para búsqueda
            $table->string('pais')->nullable()->index();   // Índice para filtro
            $table->string('nombre_contacto')->nullable();
            $table->string('correo')->nullable()->unique(); // asumimos que el correo es único por universidad
            $table->string('direccion')->nullable();
            $table->string('tipo_convenio')->nullable()->index(); // Índice para filtro
            $table->date('fecha_alta_convenio')->nullable();
            $table->date('fecha_vencimiento_convenio')->nullable()->index(); // Índice para filtro
            $table->text('extras')->nullable(); // Campo de texto más amplio
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('universidades');
    }
};
