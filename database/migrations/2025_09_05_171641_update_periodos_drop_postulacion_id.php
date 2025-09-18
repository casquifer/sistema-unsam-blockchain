<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasColumn('periodos', 'postulacion_id')) {
            Schema::table('periodos', function (Blueprint $table) {
                // Si existía FK, la quitamos primero (si no existía y falla, eliminar esta línea)
                $table->dropForeign(['postulacion_id']);
            });

            Schema::table('periodos', function (Blueprint $table) {
                $table->dropColumn('postulacion_id');
            });
        }
    }

    public function down(): void
    {
        Schema::table('periodos', function (Blueprint $table) {
            $table->foreignId('postulacion_id')
                ->nullable()
                ->constrained('postulaciones')
                ->nullOnDelete();
        });
    }
};

