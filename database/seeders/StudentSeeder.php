<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some graduated students
        Student::factory()
            ->count(25)
            ->lulus()
            ->create();

        // Create some non-graduated students
        Student::factory()
            ->count(15)
            ->tidakLulus()
            ->create();

        // Create some mixed status students
        Student::factory()
            ->count(20)
            ->create();
    }
}