<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('postulaciones', function (Blueprint $table) {
            $table->dropColumn(['fecha_inicio', 'fecha_final']);      // Eliminamos columnas que ya no se usan

            // Agregar las nuevas columnas
            $table->unsignedBigInteger('periodo_fin_id')->nullable()->after('periodo_inicio_id');
            $table->string('carrera_principal')->nullable()->after('periodo_fin_id');

            // Si `estado` sigue igual, no hace falta tocarlo
        });
    }

    public function down(): void
    {
        Schema::table('postulaciones', function (Blueprint $table) {
            // Revertir cambios
            $table->renameColumn('periodo_inicio_id', 'perido_id');
            $table->dropColumn(['periodo_fin_id', 'carrera_principal']);

            // Volver a crear las columnas eliminadas
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_fin')->nullable();
        });
    }
};
