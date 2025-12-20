<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->text('symptoms');
            $table->text('diagnosis');
            $table->text('treatment');
            $table->text('notes')->nullable();
            $table->json('vital_signs')->nullable();
            $table->timestamps();

            $table->index('patient_id');
            $table->index('doctor_id');
            $table->index('appointment_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
