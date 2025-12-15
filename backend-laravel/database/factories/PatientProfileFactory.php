<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PatientProfile>
 */
class PatientProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->patient(),
            'full_name' => fake()->name(),
            'date_of_birth' => fake()->date('Y-m-d', '-18 years'),
            'gender' => fake()->randomElement(['male', 'female']),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'emergency_contact' => fake()->phoneNumber(),
            'medical_history' => fake()->optional()->sentence(),
        ];
    }
}
