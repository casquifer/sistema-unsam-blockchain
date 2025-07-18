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
            $table->string('materia_principal_1')->nullable()->after('estado_postulacion');
            $table->string('materia_principal_2')->nullable()->after('materia_principal_1');
            $table->string('materia_principal_3')->nullable()->after('materia_principal_2');
            $table->string('materia_optativa_1')->nullable()->after('materia_principal_3');
            $table->string('materia_optativa_2')->nullable()->after('materia_optativa_1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alumnos', function (Blueprint $table) {
            $table->dropColumn([
                'materia_principal_1',
                'materia_principal_2',
                'materia_principal_3',
                'materia_optativa_1',
                'materia_optativa_2',
            ]);
        });
    }
};
