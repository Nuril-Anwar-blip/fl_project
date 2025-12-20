<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\User;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $patientUsers = User::where('role', 'patient')->get();

        $patientData = [
            ['date_of_birth' => '1990-05-15', 'gender' => 'male', 'blood_type' => 'A+', 'allergies' => 'None', 'emergency_contact' => '081234560001', 'insurance_number' => 'INS-2024-001'],
            ['date_of_birth' => '1985-08-22', 'gender' => 'female', 'blood_type' => 'B+', 'allergies' => 'Peanuts', 'emergency_contact' => '081234560002', 'insurance_number' => 'INS-2024-002'],
            ['date_of_birth' => '1992-03-10', 'gender' => 'male', 'blood_type' => 'O+', 'allergies' => 'Penicillin', 'emergency_contact' => '081234560003', 'insurance_number' => 'INS-2024-003'],
            ['date_of_birth' => '1988-11-30', 'gender' => 'female', 'blood_type' => 'AB+', 'allergies' => 'Dust', 'emergency_contact' => '081234560004', 'insurance_number' => 'INS-2024-004'],
            ['date_of_birth' => '1995-07-18', 'gender' => 'male', 'blood_type' => 'A-', 'allergies' => 'None', 'emergency_contact' => '081234560005', 'insurance_number' => 'INS-2024-005'],
            ['date_of_birth' => '1987-12-05', 'gender' => 'female', 'blood_type' => 'B-', 'allergies' => 'Shellfish', 'emergency_contact' => '081234560006', 'insurance_number' => 'INS-2024-006'],
            ['date_of_birth' => '1993-09-25', 'gender' => 'male', 'blood_type' => 'O-', 'allergies' => 'None', 'emergency_contact' => '081234560007', 'insurance_number' => 'INS-2024-007'],
            ['date_of_birth' => '1991-04-14', 'gender' => 'female', 'blood_type' => 'A+', 'allergies' => 'Latex', 'emergency_contact' => '081234560008', 'insurance_number' => 'INS-2024-008'],
            ['date_of_birth' => '1989-06-20', 'gender' => 'male', 'blood_type' => 'B+', 'allergies' => 'None', 'emergency_contact' => '081234560009', 'insurance_number' => 'INS-2024-009'],
            ['date_of_birth' => '1994-02-28', 'gender' => 'female', 'blood_type' => 'O+', 'allergies' => 'Aspirin', 'emergency_contact' => '081234560010', 'insurance_number' => 'INS-2024-010']
        ];

        foreach ($patientUsers as $index => $user) {
            Patient::create(array_merge([
                'user_id' => $user->id
            ], $patientData[$index]));
        }
    }
}
