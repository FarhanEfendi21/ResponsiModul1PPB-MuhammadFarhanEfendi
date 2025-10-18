#  REST API Layanan Cuci Sepatu 
## Deskripsi Umum Proyek
Proyek ini adalah tugas responsi untuk modul 1 Pembuatan API dengan JavaScript. Dalam proyek ini, dibuat sebuah API menggunakan Node.js dan Express.js yang berfungsi untuk mengelola data sepatu yang sedang dalam proses pencucian pada sebuah layanan jasa cuci sepatu.

## Tujuan dan Fitur Utama
### Tujuan
Tujuan utama dari API ini adalah menyediakan sistem terpusat untuk melacak status setiap pasang sepatu yang masuk, mulai dari proses pemcucian hingga selesai dan diambil oleh pelanggan.

### Fitur Utama
| Metode | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/items` | Mengambil dan menampilkan seluruh daftar data cucian sepatu. |
| `POST` | `/items` | Membuat entri data baru untuk sepatu yang baru diterima. |
| `PUT` | `/items/:id` | Memperbarui informasi atau status data sepatu yang sudah ada. |
| `DELETE` | `/items/:id` | Menghapus data sepatu dari daftar, biasanya setelah transaksi selesai. |

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
       "nama_sepatu": "Adidas Samba",
       "nama_pelanggan": "Ronaldo",
       "status": "Proses Dicuci"
     }
   - Response Sukses:
     ```
     [
      {
        "id": "5154ffc4-3260-4d65-b5f3-f403b242bd5f",
        "created_at": "2025-10-18",
        "nama_sepatu": "Adidas Samba",
        "nama_pelanggan": "Ronaldo",
        "status": "Proses Dicuci",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": null
      }
     ]
2. Mendapatkan Semua Item (READ)
   Mengambil seluruh daftar data cucian yang ada.
   - Endpoint: GET /items
   - Response Sukses:
     ```
      [
       {
        "id": "5154ffc4-3260-4d65-b5f3-f403b242bd5f",
        "created_at": "2025-10-18",
        "nama_sepatu": "Adidas Samba",
        "nama_pelanggan": "Ronaldo",
        "status": "Proses Dicuci",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": null
       },
       {
        "id": "d5d82ce5-d2fe-4387-980b-ad852ed8095b",
        "created_at": "2025-10-18",
        "nama_sepatu": "Adidas Samba",
        "nama_pelanggan": "Ronaldo",
        "status": "Siap Diambil",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": "2025-10-18"
       },
       {
        "id": "48f60530-bbc5-416f-a04a-f147b04ece15",
        "created_at": "2025-10-18",
        "nama_sepatu": "Vans",
        "nama_pelanggan": "Lionel",
        "status": "Siap Diambil",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": "2025-10-18"
       }
      ]
     
3. Memfilter Item berdasarkan Status (READ)
   Mengambil daftar data cucian yang memiliki status spesifik.
   - Endpoint: GET /items?status=Siap Diambil 
   - Response Sukses:
     ```
     [
      {
        "id": "d5d82ce5-d2fe-4387-980b-ad852ed8095b",
        "created_at": "2025-10-18",
        "nama_sepatu": "Adidas Samba",
        "nama_pelanggan": "Ronaldo",
        "status": "Siap Diambil",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": "2025-10-18"
      },
      {
        "id": "48f60530-bbc5-416f-a04a-f147b04ece15",
        "created_at": "2025-10-18",
        "nama_sepatu": "Vans",
        "nama_pelanggan": "Lionel",
        "status": "Siap Diambil",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": "2025-10-18"
      }
     ]

4. Memperbarui Item (UPDATE)
   Mengubah data item yang sudah ada, misalnya mengubah statusnya.
   - Endpoint: PUT /items/5154ffc4-3260-4d65-b5f3-f403b242bd5f
   - Request Body:
     ```
     {
      "status": "Siap Diambil",
      "tanggalSelesai": "2025-10-23" 
     }

   - Response Sukses:
     ```
     [
      {
        "id": "5154ffc4-3260-4d65-b5f3-f403b242bd5f",
        "created_at": "2025-10-18T14:17:41.082483+00:00",
        "nama_sepatu": "Adidas Samba",
        "nama_pelanggan": "Ronaldo",
        "status": "Siap Diambil",
        "tanggalMasuk": "2025-10-18",
        "tanggalSelesai": "2025-10-23"
      }
     ]
     
5. Menghapus Item (DELETE)
   Menghapus data item dari sistem.
   - Endpoint: PUT /items/5154ffc4-3260-4d65-b5f3-f403b242bd5f
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






