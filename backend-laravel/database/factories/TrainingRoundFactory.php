<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TrainingRound>
 */
class TrainingRoundFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'round_number' => fake()->unique()->numberBetween(1, 100),
            'global_accuracy' => fake()->optional()->randomFloat(2, 50, 100),
            'global_loss' => fake()->optional()->randomFloat(4, 0, 1),
            'num_participants' => fake()->numberBetween(1, 10),
            'started_at' => fake()->dateTimeBetween('-30 days', '-1 day'),
            'finished_at' => fake()->optional()->dateTimeBetween('-1 day', 'now'),
        ];
    }

    /**
     * Indicate that the training round is completed.
     */
    public function completed(): static
    {
        return $this->state(fn(array $attributes) => [
            'global_accuracy' => fake()->randomFloat(2, 70, 100),
            'global_loss' => fake()->randomFloat(4, 0, 0.5),
            'finished_at' => fake()->dateTimeBetween('-1 day', 'now'),
        ]);
    }

    /**
     * Indicate that the training round is in progress.
     */
    public function inProgress(): static
    {
        return $this->state(fn(array $attributes) => [
            'global_accuracy' => null,
            'global_loss' => null,
            'finished_at' => null,
        ]);
    }
}
