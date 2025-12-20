<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin
        User::create([
            'name' => 'Admin Healthcare',
            'email' => 'admin@healthcare.com',
            'phone' => '081234567890',
            'address' => 'Jakarta Pusat',
            'role' => 'admin',
            'password' => Hash::make('password123'),
            'email_verified_at' => now()
        ]);

        // Create Doctors
        $doctors = [
            [
                'name' => 'Dr. Sarah Johnson',
                'email' => 'sarah@healthcare.com',
                'phone' => '081234567891',
                'address' => 'Jakarta Selatan',
                'role' => 'doctor'
            ],
            [
                'name' => 'Dr. Michael Chen',
                'email' => 'michael@healthcare.com',
                'phone' => '081234567892',
                'address' => 'Jakarta Utara',
                'role' => 'doctor'
            ],
            [
                'name' => 'Dr. Amanda Williams',
                'email' => 'amanda@healthcare.com',
                'phone' => '081234567893',
                'address' => 'Jakarta Barat',
                'role' => 'doctor'
            ],
            [
                'name' => 'Dr. Robert Garcia',
                'email' => 'robert@healthcare.com',
                'phone' => '081234567894',
                'address' => 'Jakarta Timur',
                'role' => 'doctor'
            ],
            [
                'name' => 'Dr. Lisa Anderson',
                'email' => 'lisa@healthcare.com',
                'phone' => '081234567895',
                'address' => 'Tangerang',
                'role' => 'doctor'
            ]
        ];

        foreach ($doctors as $doctor) {
            User::create(array_merge($doctor, [
                'password' => Hash::make('password123'),
                'email_verified_at' => now()
            ]));
        }

        // Create Patients
        $patients = [
            ['name' => 'John Doe', 'email' => 'john@example.com', 'phone' => '081234567896', 'address' => 'Jakarta Selatan'],
            ['name' => 'Jane Smith', 'email' => 'jane@example.com', 'phone' => '081234567897', 'address' => 'Jakarta Utara'],
            ['name' => 'David Brown', 'email' => 'david@example.com', 'phone' => '081234567898', 'address' => 'Jakarta Barat'],
            ['name' => 'Emily Davis', 'email' => 'emily@example.com', 'phone' => '081234567899', 'address' => 'Jakarta Timur'],
            ['name' => 'Michael Wilson', 'email' => 'mwilson@example.com', 'phone' => '081234567800', 'address' => 'Bekasi'],
            ['name' => 'Sarah Martinez', 'email' => 'smartinez@example.com', 'phone' => '081234567801', 'address' => 'Depok'],
            ['name' => 'James Taylor', 'email' => 'jtaylor@example.com', 'phone' => '081234567802', 'address' => 'Bogor'],
            ['name' => 'Jennifer Lee', 'email' => 'jlee@example.com', 'phone' => '081234567803', 'address' => 'Tangerang'],
            ['name' => 'Christopher White', 'email' => 'cwhite@example.com', 'phone' => '081234567804', 'address' => 'Jakarta Pusat'],
            ['name' => 'Patricia Harris', 'email' => 'pharris@example.com', 'phone' => '081234567805', 'address' => 'Jakarta Selatan']
        ];

        foreach ($patients as $patient) {
            User::create(array_merge($patient, [
                'role' => 'patient',
                'password' => Hash::make('password123'),
                'email_verified_at' => now()
            ]));
        }
    }
}
