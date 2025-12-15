<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\PatientProfileController;
use App\Http\Controllers\HealthRecordController;
use App\Http\Controllers\PredictionController;
use App\Http\Controllers\EducationArticleController;
use App\Http\Controllers\FederatedRoundController;
use App\Http\Controllers\TrainingRoundController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\PasswordResetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth routes (tidak perlu autentikasi)
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('profile', [AuthController::class, 'profile']);
});

// Backward-compat alias: /api/login
Route::post('login', [AuthController::class, 'login']);

// Protected routes (perlu autentikasi dengan token)
Route::middleware('auth:sanctum')->group(function () {

    // User management
    Route::apiResource('users', UserController::class);

    // Patient management
    Route::apiResource('patients', PatientController::class);
    Route::apiResource('patient-profiles', PatientProfileController::class);

    // Health records
    Route::apiResource('health-records', HealthRecordController::class);

    // Predictions
    Route::apiResource('predictions', PredictionController::class);

    // Education articles
    Route::apiResource('education-articles', EducationArticleController::class);

    // Federated learning
    Route::apiResource('federated-nodes', FederatedRoundController::class);

    // Training rounds
    Route::apiResource('training-rounds', TrainingRoundController::class);
    Route::post('training-rounds/{id}/aggregate', [TrainingRoundController::class, 'aggregate']);

    // Activity logs
    Route::apiResource('activity-logs', ActivityLogController::class);

    // Personal access tokens
    Route::apiResource('personal-access-tokens', PersonalAccessTokenController::class);

    // Password reset
    Route::apiResource('password-resets', PasswordResetController::class);
});
