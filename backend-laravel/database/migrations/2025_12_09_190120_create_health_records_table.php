<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * CreateHealthRecordsTable Migration
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patient_profiles')->onDelete('cascade');
            $table->date('tanggal_pencatatan');
            $table->float('kadar_gula_darah')->nullable();
            $table->integer('tekanan_darah_sistolik')->nullable();
            $table->integer('tekanan_darah_diastolik')->nullable();
            $table->float('bmi')->nullable();
            $table->enum('aktivitas_fisik', ['rendah', 'sedang', 'tinggi'])->nullable();
            $table->text('catatan_tambahan')->nullable();
            $table->timestamps();

            // Index
            $table->index('patient_id', 'Index_hr_patient');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_records');
    }
};