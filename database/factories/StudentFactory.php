<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Student>
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $classes = ['XII IPA 1', 'XII IPA 2', 'XII IPS 1', 'XII IPS 2', 'XII Bahasa'];
        $majors = ['IPA', 'IPS', 'Bahasa'];
        $score = fake()->numberBetween(5500, 10000) / 100; // Score between 55.00 - 100.00
        
        return [
            'nisn' => fake()->unique()->numerify('##########'),
            'name' => fake('id_ID')->name(),
            'class' => fake()->randomElement($classes),
            'major' => fake()->randomElement($majors),
            'score' => $score,
            'status' => $score >= 75 ? 'lulus' : 'tidak_lulus',
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the student has graduated.
     *
     * @return static
     */
    public function lulus(): static
    {
        return $this->state(fn (array $attributes) => [
            'score' => fake()->numberBetween(7500, 10000) / 100, // 75.00 - 100.00
            'status' => 'lulus',
        ]);
    }

    /**
     * Indicate that the student has not graduated.
     *
     * @return static
     */
    public function tidakLulus(): static
    {
        return $this->state(fn (array $attributes) => [
            'score' => fake()->numberBetween(5500, 7499) / 100, // 55.00 - 74.99
            'status' => 'tidak_lulus',
        ]);
    }
}