<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\User;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $doctorUsers = User::where('role', 'doctor')->get();

        $specializations = [
            [
                'specialization' => 'Cardiologist',
                'license_number' => 'DOC-CARD-001',
                'experience_years' => 10,
                'consultation_fee' => 500000,
                'available_days' => ['monday', 'wednesday', 'friday'],
                'available_hours' => ['09:00-12:00', '14:00-17:00']
            ],
            [
                'specialization' => 'Neurologist',
                'license_number' => 'DOC-NEUR-002',
                'experience_years' => 12,
                'consultation_fee' => 600000,
                'available_days' => ['tuesday', 'thursday', 'saturday'],
                'available_hours' => ['10:00-13:00', '15:00-18:00']
            ],
            [
                'specialization' => 'Pediatrician',
                'license_number' => 'DOC-PEDI-003',
                'experience_years' => 8,
                'consultation_fee' => 400000,
                'available_days' => ['monday', 'wednesday', 'friday'],
                'available_hours' => ['08:00-12:00', '13:00-16:00']
            ],
            [
                'specialization' => 'Orthopedic Surgeon',
                'license_number' => 'DOC-ORTH-004',
                'experience_years' => 15,
                'consultation_fee' => 700000,
                'available_days' => ['tuesday', 'thursday'],
                'available_hours' => ['09:00-12:00', '14:00-17:00']
            ],
            [
                'specialization' => 'General Practitioner',
                'license_number' => 'DOC-GP-005',
                'experience_years' => 5,
                'consultation_fee' => 300000,
                'available_days' => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
                'available_hours' => ['08:00-14:00']
            ]
        ];

        foreach ($doctorUsers as $index => $user) {
            Doctor::create(array_merge([
                'user_id' => $user->id
            ], $specializations[$index]));
        }
    }
}
