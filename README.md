# REST API Layanan Cuci Sepatu 
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

### Struktur Data
Data disimpan dalam tabel items di database Supabase. Penggunaan uuid sebagai primary key memastikan setiap entri memiliki ID yang unik secara global.
| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `uuid` (Primary Key) | ID unik universal yang digenerasi otomatis untuk setiap data cucian. |
| `created_at` | `timestampz` | Waktu dan tanggal kapan data pertama kali dibuat. |
| `nama_sepatu` | `text` | Nama atau deskripsi singkat sepatu (misal: "Nike Air Jordan 1"). |
| `nama_pelanggan` | `text` | Nama pelanggan pemilik sepatu. |
| `status` | `text` | Status progres pencucian. Nilai yang disarankan: **Diterima**, **Proses**, **Siap Diambil**, **Selesai**. |
