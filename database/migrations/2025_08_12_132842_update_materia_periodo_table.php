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
        Schema::table('materia_periodo', function (Blueprint $table) {
            $table->string('materia_estado')->nullable()->after('materia_prioridad');
            $table->string('acceso_campus_virtual')->nullable()->after('materia_estado');
            $table->string('fecha_final')->nullable()->after('acceso_campus_virtual');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('materia_periodo', function (Blueprint $table) {
            $table->dropColumn([
                'materia_estado',
                'acceso_campus_virtual',
                'fecha_final'
            ]);
        });
    }
};
