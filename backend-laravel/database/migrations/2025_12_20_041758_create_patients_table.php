<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('date_of_birth');
            $table->enum('gender', ['male', 'female']);
            $table->string('blood_type', 10)->nullable();
            $table->text('allergies')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('insurance_number')->nullable();
            $table->timestamps();

            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
