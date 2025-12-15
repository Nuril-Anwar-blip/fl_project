<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\PatientProfile;
use App\Models\FederatedNode;
use App\Models\TrainingRound;
use App\Models\HealthRecord;
use App\Models\EducationArticle;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Buat admin user
        $admin = User::create([
            'nama' => 'Administrator',
            'email' => 'admin@federated-health.com',
            'password' => 'password123',
            'role' => 'admin',
        ]);

        // Buat dokter user
        $doctor = User::create([
            'nama' => 'Dr. Sarah Johnson',
            'email' => 'doctor@federated-health.com',
            'password' => 'password123',
            'role' => 'dokter',
        ]);

        // Buat pasien users
        $patient1 = User::create([
            'nama' => 'John Doe',
            'email' => 'patient1@federated-health.com',
            'password' => 'password123',
            'role' => 'pasien',
        ]);

        $patient2 = User::create([
            'nama' => 'Jane Smith',
            'email' => 'patient2@federated-health.com',
            'password' => 'password123',
            'role' => 'pasien',
        ]);

        $patient3 = User::create([
            'nama' => 'Bob Wilson',
            'email' => 'patient3@federated-health.com',
            'password' => 'password123',
            'role' => 'pasien',
        ]);

        // Buat patient profiles (kolom versi Indonesia)
        $profile1 = PatientProfile::create([
            'user_id' => $patient1->id,
            'no_rekam_medis' => 'RM-001',
            'tanggal_lahir' => '1985-03-15',
            'jenis_kelamin' => 'laki-laki',
            'berat_badan' => 75.5,
            'tinggi_badan' => 175,
            'riwayat_keluarga_diabetes' => true,
        ]);

        $profile2 = PatientProfile::create([
            'user_id' => $patient2->id,
            'no_rekam_medis' => 'RM-002',
            'tanggal_lahir' => '1990-07-22',
            'jenis_kelamin' => 'perempuan',
            'berat_badan' => 62.3,
            'tinggi_badan' => 165,
            'riwayat_keluarga_diabetes' => false,
        ]);

        $profile3 = PatientProfile::create([
            'user_id' => $patient3->id,
            'no_rekam_medis' => 'RM-003',
            'tanggal_lahir' => '1978-11-08',
            'jenis_kelamin' => 'laki-laki',
            'berat_badan' => 82.1,
            'tinggi_badan' => 180,
            'riwayat_keluarga_diabetes' => true,
        ]);

        // Buat federated nodes
        $node1 = FederatedNode::create([
            'device_id' => 'device_001_john',
            'patient_id' => $profile1->id,
            'status' => 'aktif',
            'last_sync_at' => now(),
            'local_accuracy' => 87.5,
        ]);

        $node2 = FederatedNode::create([
            'device_id' => 'device_002_jane',
            'patient_id' => $profile2->id,
            'status' => 'aktif',
            'last_sync_at' => now(),
            'local_accuracy' => 92.3,
        ]);

        $node3 = FederatedNode::create([
            'device_id' => 'device_003_bob',
            'patient_id' => $profile3->id,
            'status' => 'aktif',
            'last_sync_at' => now(),
            'local_accuracy' => 89.7,
        ]);

        // Buat training rounds
        $round1 = TrainingRound::create([
            'round_number' => 1,
            'global_accuracy' => 89.83,
            'global_loss' => 0.1017,
            'num_participants' => 3,
            'started_at' => now()->subDays(7),
            'finished_at' => now()->subDays(6),
        ]);

        $round2 = TrainingRound::create([
            'round_number' => 2,
            'global_accuracy' => 91.45,
            'global_loss' => 0.0855,
            'num_participants' => 3,
            'started_at' => now()->subDays(5),
            'finished_at' => now()->subDays(4),
        ]);

        $round3 = TrainingRound::create([
            'round_number' => 3,
            'num_participants' => 3,
            'started_at' => now()->subDays(2),
        ]);

        // Buat health records (kolom versi Indonesia)
        HealthRecord::create([
            'patient_id' => $profile1->id,
            'tanggal_pencatatan' => now()->subDays(1)->format('Y-m-d'),
            'kadar_gula_darah' => 98.5,
            'tekanan_darah_sistolik' => 120,
            'tekanan_darah_diastolik' => 80,
            'bmi' => 24.7,
            'aktivitas_fisik' => 'sedang',
            'catatan_tambahan' => 'Pemeriksaan rutin, tekanan darah normal',
        ]);

        HealthRecord::create([
            'patient_id' => $profile1->id,
            'tanggal_pencatatan' => now()->format('Y-m-d'),
            'kadar_gula_darah' => 102.1,
            'tekanan_darah_sistolik' => 125,
            'tekanan_darah_diastolik' => 82,
            'bmi' => 24.6,
            'aktivitas_fisik' => 'rendah',
            'catatan_tambahan' => 'Kontrol lanjutan, peningkatan ringan tekanan darah',
        ]);

        HealthRecord::create([
            'patient_id' => $profile2->id,
            'tanggal_pencatatan' => now()->subDays(2)->format('Y-m-d'),
            'kadar_gula_darah' => 92.0,
            'tekanan_darah_sistolik' => 110,
            'tekanan_darah_diastolik' => 70,
            'bmi' => 22.9,
            'aktivitas_fisik' => 'sedang',
            'catatan_tambahan' => 'Kontrol asma, paru-paru baik',
        ]);

        HealthRecord::create([
            'patient_id' => $profile3->id,
            'tanggal_pencatatan' => now()->subDays(3)->format('Y-m-d'),
            'kadar_gula_darah' => 108.3,
            'tekanan_darah_sistolik' => 135,
            'tekanan_darah_diastolik' => 85,
            'bmi' => 25.3,
            'aktivitas_fisik' => 'rendah',
            'catatan_tambahan' => 'Cek jantung, pemantauan kolesterol',
        ]);

        // Buat education articles
        EducationArticle::create([
            'title' => 'Pentingnya Kontrol Tekanan Darah Rutin',
            'content' => 'Tekanan darah tinggi atau hipertensi adalah kondisi kesehatan yang dapat meningkatkan risiko penyakit jantung dan stroke. Artikel ini menjelaskan pentingnya melakukan kontrol tekanan darah secara rutin dan cara menjaga tekanan darah tetap normal.',
            'author_id' => $doctor->id,
            'category' => 'Pencegahan',
            'tags' => 'hipertensi,tekanan darah,jantung',
            'is_published' => true,
            'published_at' => now()->subDays(10),
        ]);

        EducationArticle::create([
            'title' => 'Mengelola Diabetes dengan Pola Makan Sehat',
            'content' => 'Diabetes merupakan penyakit kronis yang memerlukan pengelolaan yang baik. Pola makan sehat memainkan peran penting dalam mengontrol kadar gula darah. Pelajari tentang makanan yang baik untuk penderita diabetes.',
            'author_id' => $doctor->id,
            'category' => 'Nutrisi',
            'tags' => 'diabetes,gula darah, nutrisi',
            'is_published' => true,
            'published_at' => now()->subDays(8),
        ]);

        EducationArticle::create([
            'title' => 'Teknik Bernapas untuk Mengatasi Asma',
            'content' => 'Asma dapat dikontrol dengan teknik bernapas yang tepat. Artikel ini memberikan panduan praktis tentang teknik bernapas yang dapat membantu mengurangi gejala asma dan meningkatkan kualitas hidup.',
            'author_id' => $doctor->id,
            'category' => 'Pengobatan',
            'tags' => 'asma,bernapas,respirasi',
            'is_published' => true,
            'published_at' => now()->subDays(5),
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('Created:');
        $this->command->info('- 1 Admin user');
        $this->command->info('- 1 Doctor user');
        $this->command->info('- 3 Patient users with profiles');
        $this->command->info('- 3 Federated nodes');
        $this->command->info('- 3 Training rounds');
        $this->command->info('- 4 Health records');
        $this->command->info('- 3 Education articles');
    }
}
