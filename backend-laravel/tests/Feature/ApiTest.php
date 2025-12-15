<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\PatientProfile;
use App\Models\FederatedNode;
use App\Models\TrainingRound;
use App\Models\PersonalAccessToken;

class ApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_register()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'role' => 'patient'
        ];

        $response = $this->postJson('/api/auth/register', $userData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role'],
                'token'
            ]);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'role' => 'patient'
        ]);
    }

    /** @test */
    public function user_can_login()
    {
        $user = User::factory()->create([
            'email' => 'login@example.com',
            'password' => bcrypt('password123'),
            'role' => 'patient'
        ]);

        $loginData = [
            'email' => 'login@example.com',
            'password' => 'password123'
        ];

        $response = $this->postJson('/api/auth/login', $loginData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'user' => ['id', 'name', 'email', 'role'],
                'token'
            ]);
    }

    /** @test */
    public function authenticated_user_can_get_profile()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users/' . $user->id);

        $response->assertStatus(200)
            ->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_access_protected_route()
    {
        $response = $this->getJson('/api/users/1');

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated']);
    }

    /** @test */
    public function user_can_create_patient_profile()
    {
        $user = User::factory()->create(['role' => 'patient']);
        $token = $user->createToken('test-token')->plainTextToken;

        $patientData = [
            'user_id' => $user->id,
            'full_name' => 'John Doe',
            'date_of_birth' => '1985-03-15',
            'gender' => 'male',
            'phone' => '+1234567890',
            'address' => '123 Main St',
            'emergency_contact' => '+0987654321',
            'medical_history' => 'Hypertension'
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/patients', $patientData);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'full_name', 'user_id']);

        $this->assertDatabaseHas('patient_profiles', [
            'full_name' => 'John Doe',
            'user_id' => $user->id
        ]);
    }

    /** @test */
    public function user_can_create_federated_node()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $patient = PatientProfile::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $nodeData = [
            'device_id' => 'device_001_test',
            'patient_id' => $patient->id,
            'status' => 'aktif',
            'local_accuracy' => 85.5
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/federated-nodes', $nodeData);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'device_id', 'status']);

        $this->assertDatabaseHas('federated_rounds', [
            'device_id' => 'device_001_test',
            'status' => 'aktif'
        ]);
    }

    /** @test */
    public function user_can_create_training_round()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $token = $user->createToken('test-token')->plainTextToken;

        $roundData = [
            'round_number' => 1,
            'num_participants' => 5,
            'started_at' => now()->toISOString()
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/training-rounds', $roundData);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'round_number', 'num_participants']);

        $this->assertDatabaseHas('training_rounds', [
            'round_number' => 1,
            'num_participants' => 5
        ]);
    }

    /** @test */
    public function training_round_can_aggregate_accuracy()
    {
        $user = User::factory()->create(['role' => 'admin']);
        $token = $user->createToken('test-token')->plainTextToken;

        // Create training round
        $round = TrainingRound::factory()->create([
            'round_number' => 1,
            'num_participants' => 0
        ]);

        // Create federated nodes with accuracy
        FederatedNode::factory()->create([
            'status' => 'aktif',
            'local_accuracy' => 80.0
        ]);

        FederatedNode::factory()->create([
            'status' => 'aktif',
            'local_accuracy' => 90.0
        ]);

        FederatedNode::factory()->create([
            'status' => 'aktif',
            'local_accuracy' => 85.0
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/training-rounds/' . $round->id . '/aggregate');

        $response->assertStatus(200)
            ->assertJsonStructure(['round' => ['id', 'global_accuracy', 'global_loss']]);

        // Check if aggregation worked (average of 80, 90, 85 = 85)
        $this->assertDatabaseHas('training_rounds', [
            'id' => $round->id,
            'global_accuracy' => 85.0,
            'num_participants' => 3
        ]);
    }

    /** @test */
    public function doctor_can_create_education_article()
    {
        $doctor = User::factory()->create(['role' => 'doctor']);
        $token = $doctor->createToken('test-token')->plainTextToken;

        $articleData = [
            'title' => 'Pentingnya Vaksinasi',
            'content' => 'Vaksinasi sangat penting untuk kesehatan masyarakat...',
            'category' => 'Pencegahan',
            'tags' => 'vaksin,kesehatan,imunisasi',
            'is_published' => true
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/education-articles', $articleData);

        $response->assertStatus(201)
            ->assertJsonStructure(['id', 'title', 'content', 'author_id']);

        $this->assertDatabaseHas('education_articles', [
            'title' => 'Pentingnya Vaksinasi',
            'author_id' => $doctor->id
        ]);
    }

    /** @test */
    public function patient_cannot_create_education_article()
    {
        $patient = User::factory()->create(['role' => 'patient']);
        $token = $patient->createToken('test-token')->plainTextToken;

        $articleData = [
            'title' => 'Artikel dari Patient',
            'content' => 'Ini artikel dari patient...',
            'category' => 'Umum',
            'is_published' => true
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/education-articles', $articleData);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Unauthorized']);
    }
}
