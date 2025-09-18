<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('postulaciones', function (Blueprint $table) {
            // nuevo FK a periodos
            $table->foreignId('periodo_id')
                ->nullable()
                ->after('alumno_id')
                ->constrained('periodos')
                ->nullOnDelete();

            // nuevo nombre de campo (sin depender de DBAL)
            if (!Schema::hasColumn('postulaciones', 'fecha_final')) {
                $table->date('fecha_final')->nullable()->after('fecha_inicio');
            }
        });

        // migrar datos de fecha_fin -> fecha_final si existía
        if (Schema::hasColumn('postulaciones', 'fecha_fin')) {
            DB::statement('UPDATE postulaciones SET fecha_final = fecha_fin WHERE fecha_final IS NULL');

            Schema::table('postulaciones', function (Blueprint $table) {
                $table->dropColumn('fecha_fin');
            });
        }
    }

    public function down(): void
    {
        Schema::table('postulaciones', function (Blueprint $table) {
            $table->date('fecha_fin')->nullable()->after('fecha_inicio');
        });

        // revertir datos
        DB::statement('UPDATE postulaciones SET fecha_fin = fecha_final WHERE fecha_final IS NOT NULL');

        Schema::table('postulaciones', function (Blueprint $table) {
            $table->dropForeign(['periodo_id']);
            $table->dropColumn('periodo_id');
            $table->dropColumn('fecha_final');
        });
    }
};
