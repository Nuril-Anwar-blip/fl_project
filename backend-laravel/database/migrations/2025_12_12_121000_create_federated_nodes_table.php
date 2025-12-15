<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('federated_nodes', function (Blueprint $table) {
            $table->id();
            $table->string('device_id', 191)->unique();
            $table->foreignId('patient_id')->nullable()->constrained('patient_profiles')->nullOnDelete();
            $table->enum('status', ['aktif', 'nonaktif'])->default('aktif');
            $table->timestamp('last_sync_at')->nullable();
            $table->float('local_accuracy')->nullable();
            $table->timestamps();

            $table->index('patient_id', 'Index_fn_patient');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('federated_nodes');
    }
};

