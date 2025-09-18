<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Si la tabla se creó con CamelCase (p. ej. en Windows) o en snake_case
        Schema::dropIfExists('DocumentoPeriodo');
        Schema::dropIfExists('documento_periodo');
    }

    public function down(): void
    {
        // Opcional: recrea una versión mínima para rollback
        if (!Schema::hasTable('documento_periodo')) {
            Schema::create('documento_periodo', function (Blueprint $table) {
                $table->id();
                $table->timestamps();
            });
        }
    }
};
