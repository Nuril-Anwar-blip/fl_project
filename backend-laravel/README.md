# Sistem Federated Learning Kesehatan

Sistem manajemen data kesehatan berbasis federated learning menggunakan Laravel 11 untuk memungkinkan analisis data kesehatan secara terdesentralisasi dengan menjaga privasi data pasien.

## 📋 Fitur Utama

### 🔐 Autentikasi & Otorisasi
- **Personal Access Token**: Sistem autentikasi aman menggunakan token personal
- **Role-Based Access Control**: Tiga level akses (admin, doctor, patient)
- **Token Authentication**: Validasi token untuk semua endpoint API

### 👥 Manajemen Pengguna
- **CRUD Lengkap**: Create, Read, Update, Delete pengguna
- **Role Management**: Pengelolaan peran pengguna
- **Profile Management**: Manajemen profil pengguna

### 🏥 Manajemen Data Kesehatan
- **Patient Profiles**: Profil pasien lengkap dengan informasi demografis
- **Health Records**: Catatan kesehatan pasien dengan tracking historis
- **Predictions**: Sistem prediksi kesehatan berdasarkan data historis
- **Education Articles**: Konten edukasi untuk pasien

### 🤖 Federated Learning
- **Federated Nodes**: Manajemen perangkat peserta federated learning
- **Training Rounds**: Siklus pelatihan model machine learning
- **Aggregation Algorithm**: Algoritma agregasi akurasi global sederhana
- **Activity Logging**: Audit trail untuk semua aktivitas sistem

## 🏗️ Arsitektur Sistem

### Struktur Database
```
users (Pengguna sistem)
├── personal_access_tokens (Token autentikasi)
├── activity_logs (Log aktivitas)
└── patient_profiles (Profil pasien)

patient_profiles (Profil pasien)
├── health_records (Catatan kesehatan)
├── predictions (Prediksi kesehatan)
└── federated_rounds (Node federated learning)

training_rounds (Ronde pelatihan)
└── Aggregation process (Proses agregasi)
```

### Komponen Utama
- **Laravel 11 Framework**: Backend API
- **MySQL Database**: Penyimpanan data relasional
- **Personal Access Tokens**: Sistem autentikasi
- **Federated Learning**: Pendekatan machine learning terdesentralisasi
- **RESTful API**: Desain API standar industri

## 🚀 Instalasi & Setup

### Persyaratan Sistem
- PHP 8.1 atau lebih tinggi
- Composer
- MySQL 8.0 atau MariaDB
- Laravel 11

### Langkah Instalasi
```bash
# 1. Clone repository
git clone <repository-url>
cd backend-laravel

# 2. Install dependencies
composer install

# 3. Setup environment
cp .env.example .env
php artisan key:generate

# 4. Configure database di .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=federated_health
DB_USERNAME=your_username
DB_PASSWORD=your_password

# 5. Run migrations
php artisan migrate

# 6. Seed data (opsional)
php artisan db:seed

# 7. Start server
php artisan serve
```

## 📡 API Endpoints

### Autentikasi
```
POST   /api/auth/register     - Registrasi pengguna baru
POST   /api/auth/login        - Login dan dapatkan token
POST   /api/auth/logout       - Logout dan revoke token
```

### Manajemen Pengguna
```
GET    /api/users             - List semua pengguna
POST   /api/users             - Buat pengguna baru
GET    /api/users/{id}        - Detail pengguna
PUT    /api/users/{id}        - Update pengguna
DELETE /api/users/{id}        - Hapus pengguna
```

### Manajemen Pasien
```
GET    /api/patients          - List profil pasien
POST   /api/patients          - Buat profil pasien
GET    /api/patients/{id}     - Detail profil pasien
PUT    /api/patients/{id}     - Update profil pasien
DELETE /api/patients/{id}     - Hapus profil pasien
```

### Catatan Kesehatan
```
GET    /api/health-records    - List catatan kesehatan
POST   /api/health-records    - Buat catatan kesehatan
GET    /api/health-records/{id} - Detail catatan kesehatan
PUT    /api/health-records/{id} - Update catatan kesehatan
DELETE /api/health-records/{id} - Hapus catatan kesehatan
```

### Federated Learning
```
GET    /api/federated-nodes   - List node federated
POST   /api/federated-nodes   - Buat node baru
GET    /api/federated-nodes/{id} - Detail node
PUT    /api/federated-nodes/{id} - Update node
DELETE /api/federated-nodes/{id} - Hapus node
```

### Training Rounds
```
GET    /api/training-rounds   - List ronde pelatihan
POST   /api/training-rounds   - Buat ronde baru
GET    /api/training-rounds/{id} - Detail ronde
PUT    /api/training-rounds/{id} - Update ronde
DELETE /api/training-rounds/{id} - Hapus ronde
POST   /api/training-rounds/{id}/aggregate - Agregasi akurasi
```

## 🔧 Algoritma Federated Learning

### Proses Agregasi
1. **Kumpulkan Data**: Sistem mengumpulkan akurasi lokal dari semua node aktif
2. **Validasi Data**: Pastikan data valid dan node dalam status aktif
3. **Hitung Rata-rata**: Agregasi akurasi global menggunakan rata-rata sederhana
4. **Update Model**: Simpan akurasi global dan loss ke database
5. **Sync Timestamp**: Update waktu sinkronisasi terakhir untuk semua node

### Formula Agregasi
```
Global Accuracy = Σ(Local Accuracy) / Number of Participants
Global Loss = max(0, 1 - Global Accuracy / 100)
```

## 🔒 Keamanan

### Autentikasi Token
- Token di-hash menggunakan SHA256
- Validasi expiration time
- Auto-update last_used_at
- Revoke token saat logout

### Authorization
- Role-based access control
- Permission validation per endpoint
- Activity logging untuk audit

### Data Privacy
- Data tetap di perangkat lokal
- Hanya akurasi yang dikirim ke server
- Tidak ada data kesehatan mentah yang dikirim

## 📊 Monitoring & Audit

### Activity Logging
- Semua operasi CRUD tercatat
- IP address tracking
- Timestamp logging
- User action tracking

### Error Handling
- Comprehensive error responses
- Database transaction rollback
- Validation error messages
- HTTP status code standards

## 🧪 Testing

### Unit Tests
```bash
php artisan test
```

### API Testing
```bash
# Contoh testing dengan curl
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```

## 📚 Dokumentasi API

### Authentication Headers
```
Authorization: Bearer {your_token_here}
Content-Type: application/json
```

### Response Format
```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": {...}
}
```

## 🤝 Kontribusi

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Tim Pengembang

- **Developer**: AI Assistant
- **Framework**: Laravel 11
- **Database**: MySQL
- **Architecture**: Federated Learning

## 📞 Dukungan

Untuk pertanyaan atau dukungan teknis, silakan buat issue di repository ini.

---

**Catatan**: Sistem ini masih dalam tahap pengembangan. Pastikan untuk melakukan testing menyeluruh sebelum deployment ke production environment.
