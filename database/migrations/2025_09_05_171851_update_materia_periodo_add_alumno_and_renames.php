<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('materia_periodo', function (Blueprint $table) {
            if (!Schema::hasColumn('materia_periodo', 'alumno_id')) {
                $table->foreignId('alumno_id')
                    ->nullable()
                    ->after('materia_id')
                    ->constrained('alumnos')
                    ->nullOnDelete();
            }

            if (!Schema::hasColumn('materia_periodo', 'materia_tipo')) {
                $table->string('materia_tipo', 100)->nullable()->after('materia_id');
            }

            if (!Schema::hasColumn('materia_periodo', 'fecha_examen_final')) {
                $table->date('fecha_examen_final')->nullable()->after('acceso_campus_virtual');
            }
        });

        // Migrar datos si existen las columnas antiguas
        if (Schema::hasColumn('materia_periodo', 'materia_prioridad')) {
            DB::statement('UPDATE materia_periodo SET materia_tipo = materia_prioridad WHERE materia_prioridad IS NOT NULL');
            Schema::table('materia_periodo', function (Blueprint $table) {
                $table->dropColumn('materia_prioridad');
            });
        }

        if (Schema::hasColumn('materia_periodo', 'fecha_final')) {
            DB::statement('UPDATE materia_periodo SET fecha_examen_final = fecha_final WHERE fecha_final IS NOT NULL');
            Schema::table('materia_periodo', function (Blueprint $table) {
                $table->dropColumn('fecha_final');
            });
        }
    }

    public function down(): void
    {
        Schema::table('materia_periodo', function (Blueprint $table) {
            $table->string('materia_prioridad', 100)->nullable()->after('materia_id');
            $table->date('fecha_final')->nullable()->after('acceso_campus_virtual');
        });

        // revertir datos
        DB::statement('UPDATE materia_periodo SET materia_prioridad = materia_tipo WHERE materia_tipo IS NOT NULL');
        DB::statement('UPDATE materia_periodo SET fecha_final = fecha_examen_final WHERE fecha_examen_final IS NOT NULL');

        Schema::table('materia_periodo', function (Blueprint $table) {
            if (Schema::hasColumn('materia_periodo', 'alumno_id')) {
                $table->dropForeign(['alumno_id']);
                $table->dropColumn('alumno_id');
            }
            $table->dropColumn(['materia_tipo', 'fecha_examen_final']);
        });
    }
};
