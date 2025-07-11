<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            $table->string('estado_postulacion')->nullable()->after('fecha_inicio_estudios');
        });
    }

    public function down(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            $table->dropColumn('estado_postulacion');
        });
    }
};
