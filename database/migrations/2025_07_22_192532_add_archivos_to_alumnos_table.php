<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            $table->string('archivo_pasaporte')->nullable()->after('fecha_final_estudios');
            $table->string('archivo_visa')->nullable()->after('archivo_pasaporte');
            $table->string('archivo_analitico')->nullable()->after('archivo_visa');
            $table->string('archivo_idioma')->nullable()->after('archivo_analitico');
            $table->string('archivo_carta_recomendacion')->nullable()->after('archivo_idioma');
            $table->string('archivo_cv')->nullable()->after('archivo_carta_recomendacion');
        });
    }

    public function down(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            $table->dropColumn([
                'archivo_pasaporte',
                'archivo_visa',
                'archivo_analitico',
                'archivo_idioma',
                'archivo_carta_recomendacion',
                'archivo_cv',
            ]);
        });
    }
};
