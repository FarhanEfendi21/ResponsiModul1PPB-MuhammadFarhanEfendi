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

// 4. Definisikan Routes (Endpoint)

// GET / -> Halaman utama
app.get('/', (req, res) => {
  res.send('Selamat Datang di API Cuci Sepatu!');
});

// GET /items -> Baca semua data atau filter berdasarkan status
app.get('/items', async (req, res) => {
  const { status } = req.query;
  
  let query = supabase.from('items').select('*');

  if (status) {
    query = query.eq('status', status);
  }

  try {
    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /items -> Buat data baru
app.post('/items', async (req, res) => {
  const { nama_sepatu, nama_pelanggan, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('items')
      .insert([{ nama_sepatu, nama_pelanggan, status }])
      .select(); // .select() agar data yang baru dibuat dikembalikan

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /items/:id -> Update data berdasarkan ID
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_sepatu, nama_pelanggan, status } = req.body;

  try {
    const { data, error } = await supabase
      .from('items')
      .update({ nama_sepatu, nama_pelanggan, status })
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
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.status(200).json({ message: `Item dengan ID ${id} berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 5. Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});