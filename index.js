// 1. Import library yang dibutuhkan
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// 2. Inisialisasi Express app dan koneksi Supabase
const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 3. Middleware
app.use(cors());
app.use(express.json()); // Untuk membaca body request dalam format JSON

// =================================================================================
// === API ENDPOINTS ===============================================================
// =================================================================================

// GET / -> Halaman utama
app.get('/', (req, res) => {
  res.send('Selamat Datang di API Cuci Sepatu!');
});

// GET /items -> Baca semua data (dengan created_at yang diformat)
app.get('/items', async (req, res) => {
  const { status } = req.query;
  
  // Mengurutkan berdasarkan data terbaru
  let query = supabase.from('items').select('*').order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  try {
    const { data, error } = await query;
    if (error) throw error;

    // Format 'created_at' untuk setiap item agar menjadi tanggal saja (YYYY-MM-DD)
    const formattedData = data.map(item => {
      return {
        ...item, // Salin semua properti asli dari item
        created_at: item.created_at.substring(0, 10) 
      };
    });

    res.json(formattedData); // Kirim data yang sudah diformat
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /items -> Buat data baru (dengan created_at yang diformat)
app.post('/items', async (req, res) => {
  const { nama_sepatu, nama_pelanggan, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('items')
      .insert([{ nama_sepatu, nama_pelanggan, status }])
      .select();

    if (error) throw error;

    // --- PENYESUAIAN BARU ---
    // Format juga data yang dikembalikan setelah POST
    const formattedData = data.map(item => {
        return {
            ...item,
            created_at: item.created_at.substring(0, 10)
        };
    });
    // --- AKHIR PENYESUAIAN ---

    res.status(201).json(formattedData); // Kirim data baru yang sudah diformat
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /items/:id -> Update data berdasarkan ID
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_sepatu, nama_pelanggan, status, tanggalSelesai } = req.body;

  const updateData = { nama_sepatu, nama_pelanggan, status, tanggalSelesai };

  // Otomatis isi tanggalSelesai jika status diubah menjadi "Selesai"
  if (status && !tanggalSelesai && (status.toLowerCase() === 'selesai' || status.toLowerCase() === 'siap diambil')) {
    updateData.tanggalSelesai = new Date().toISOString().split('T')[0];
  }

  try {
    const { data, error } = await supabase
      .from('items')
      .update(updateData)
      .eq('id', id)
      .select();
      
    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ error: 'Item not found' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /items/:id -> Hapus data berdasarkan ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    if (data.length === 0) {
      return res.status(404).json({ error: `Item dengan ID ${id} tidak ditemukan` });
    }
    res.status(200).json({ message: `Item dengan ID ${id} berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =================================================================================
// === JALANKAN SERVER =============================================================
// =================================================================================

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
