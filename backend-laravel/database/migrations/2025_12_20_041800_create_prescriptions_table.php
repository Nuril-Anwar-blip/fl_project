<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('medical_record_id')->nullable()->constrained()->onDelete('set null');
            $table->string('medication_name');
            $table->string('dosage');
            $table->string('frequency');
            $table->integer('duration_days');
            $table->text('instructions')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();

            $table->index('patient_id');
            $table->index('doctor_id');
            $table->index('medical_record_id');
            $table->index(['start_date', 'end_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
