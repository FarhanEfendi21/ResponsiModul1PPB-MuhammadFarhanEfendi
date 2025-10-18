#  REST API Layanan Cuci Sepatu 
## Deskripsi Umum Proyek
Proyek ini adalah sebuah REST API fungsional yang dibangun untuk mengelola alur kerja layanan cuci sepatu. API ini berfungsi sebagai backend yang menangani semua logika bisnis dan interaksi dengan database, memungkinkan aplikasi frontend (web atau mobile) untuk mengelola data cucian sepatu secara terprogram dan efisien.

## Tujuan dan Fitur Utama
### Tujuan
Tujuan utama dari API ini adalah menyediakan sistem terpusat untuk melacak status setiap pasang sepatu yang masuk, mulai dari proses pemcucian hingga selesai dan diambil oleh pelanggan.

### Fitur Utama
- Manajemen Data (CRUD): Dapat menjalankan operasi penuh untuk Create (membuat data baru), Read (membaca data), Update (memperbarui status), dan Delete (menghapus data cucian).
- Pelacakan Status Real-time: Memungkinkan pembaruan status untuk setiap item cucian (misalnya: Proses, Siap Diambil, Selesai).
- Penyaringan Data Dinamis: Memungkinkan pengguna untuk menyaring dan melihat data berdasarkan status tertentu, yang mempermudah pencarian dan manajemen operasional.
- Akses Publik: Dideploy menggunakan Vercel agar dapat diakses dari mana saja melalui internet.

## Struktur Data
Data disimpan dalam tabel items di database Supabase. Penggunaan uuid sebagai primary key memastikan setiap entri memiliki ID yang unik secara global.
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `uuid` (Primary Key) | ID unik universal yang digenerasi otomatis untuk setiap data cucian. |
| `created_at` | `timestamptz` | Waktu dan tanggal kapan data pertama kali dibuat oleh sistem. |
| `nama_sepatu` | `text` | Nama atau deskripsi singkat sepatu (contoh: "Nike Air Jordan 1"). |
| `nama_pelanggan` | `text` | Nama pelanggan yang memiliki sepatu. |
| `status` | `text` | Status progres pencucian (contoh: `Diterima`, `Proses`, `Selesai`). |
| `tanggalMasuk` | `date` | Tanggal saat sepatu diterima dari pelanggan. |
| `tanggalSelesai`| `date` | Tanggal saat proses pencucian selesai. Kolom ini bisa kosong (`NULL`). |

## Contoh Request dan Response
1. Membuat Item Baru (CREATE)
   Menambahkan data cucian sepatu baru ke dalam sistem.
   - Endpoint: POST /items
   - Request Body:
     ```
     {
     "nama_sepatu": "Nike P-6000",
     "nama_pelanggan": "Effendy",
     "status": "Proses",
     "tanggalMasuk": "2025-10-17",
     "tanggalSelesai": "2025-10-23"
     }
   - Response Sukses:
     ```
     {
        "id": "b2ce1628-cdef-4071-bb31-8c3116abab0e",
        "created_at": "2025-10-17",
        "nama_sepatu": "Nike P-6000",
        "nama_pelanggan": "Effendy",
        "status": "Proses",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-23"
     },
2. Mendapatkan Semua Item (READ)
   Mengambil seluruh daftar data cucian yang ada.
   - Endpoint: GET /items
   - Response Sukses:
     ```
     [
      {
        "id": "b2ce1628-cdef-4071-bb31-8c3116abab0e",
        "created_at": "2025-10-17",
        "nama_sepatu": "Nike P-6000",
        "nama_pelanggan": "Effendy",
        "status": "Proses",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-23"
      },
      {
        "id": "a4aa4127-4007-42c7-b5f4-f98b9da1ba01",
        "created_at": "2025-10-17",
        "nama_sepatu": "Nike P-6000",
        "nama_pelanggan": "Farhan",
        "status": "Siap Diambil",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-26"
      },
      {
        "id": "1fa5e129-8e1f-429a-ab04-b17973ff0c2b",
        "created_at": "2025-10-17",
        "nama_sepatu": "New Balance 530",
        "nama_pelanggan": "Lebron",
        "status": "Selesai",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-21"
      }
     ]
3. Memfilter Item berdasarkan Status (READ)
   Mengambil daftar data cucian yang memiliki status spesifik.
   - Endpoint: GET /items?status=Selesai dan GET /items?status=Proses
   - Response Sukses:
     ```
     [
      {
        {
        "id": "1fa5e129-8e1f-429a-ab04-b17973ff0c2b",
        "created_at": "2025-10-17",
        "nama_sepatu": "New Balance 530",
        "nama_pelanggan": "Lebron",
        "status": "Selesai",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-21"
      }
     ]
     
     [
      {
        "id": "b2ce1628-cdef-4071-bb31-8c3116abab0e",
        "created_at": "2025-10-17",
        "nama_sepatu": "Nike P-6000",
        "nama_pelanggan": "Effendy",
        "status": "Proses",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-23"
      }
     ]

4. Memperbarui Item (UPDATE)
   Mengubah data item yang sudah ada, misalnya mengubah statusnya.
   - Endpoint: PUT /items/ba28c9b1-1f42-4dbb-8c81-cfd37216fc09
   - Request Body:
     ```
     {
      "status": "Selesai",
      "tanggalSelesai": "2025-10-23" 
     }

   - Response Sukses:
     ```
     [
      {
        "id": "b2ce1628-cdef-4071-bb31-8c3116abab0e",
        "created_at": "2025-10-17",
        "nama_sepatu": "Nike P-6000",
        "nama_pelanggan": "Effendy",
        "status": "Selesai",
        "tanggalMasuk": "2025-10-17",
        "tanggalSelesai": "2025-10-23"
      }
     ]
     
5. Menghapus Item (DELETE)
   Menghapus data item dari sistem.
   - Endpoint: PUT /items/b2ce1628-cdef-4071-bb31-8c3116abab0e
   - Response Sukses:
     ```
     {
       "message": "Item dengan ID b2ce1628-cdef-4071-bb31-8c3116abab0e berhasil dihapus."
     }

## Langkah Instalasi dan Cara Menjalankan API
1. Clone Repository Buka terminal Kalian dan jalankan perintah berikut:
   ```
    git clone https://github.com/FarhanEfendi21/ResponsiModul1PPB-MuhammadFarhanEfendi.git
    cd ResponsiModul1PPB-MuhammadFarhanEfendi

2. Install Dependencies Instal semua package Node.js yang dibutuhkan proyek:
   ```
   npm install

3. Konfigurasi Environment Variables Buat sebuah file baru bernama .env di direktori utama proyek. Salin dan tempel format di bawah ini, lalu isi dengan kredensial dari dashboard Supabase Kalian.
   ```
   SUPABASE_URL=URL_PROYEK_SUPABASE_ANDA
   SUPABASE_KEY=KUNCI_ANON_PUBLIC_ANDA

4. Jalankan Server Lokal Untuk menjalankan API di mode development (server akan otomatis restart jika ada perubahan kode), gunakan:
   ```
   npm run dev

5. API akan berjalan dan dapat diakses melalui http://localhost:3000.

## Link Deploy (Vercel)
https://responsi-modul1-muhammad-farhan-efe.vercel.app/






