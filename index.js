require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Selamat Datang di API Cuci Sepatu!');
});

app.get('/items', async (req, res) => {
  const { status } = req.query;
  
  let query = supabase.from('items').select('*').order('created_at', { ascending: false });

  if (status) {
    query = query.eq('status', status);
  }

  try {
    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Belum ada data cucian yang ditemukan." });
    }

    const formattedData = data.map(item => {
      return {
        ...item,
        created_at: item.created_at.substring(0, 10) 
      };
    });

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/items', async (req, res) => {
  const { nama_sepatu, nama_pelanggan, status } = req.body;

  if (!nama_sepatu || !nama_pelanggan || !status) {
    return res.status(400).json({ 
        message: "Data yang dimasukkan tidak lengkap. Pastikan field 'nama_sepatu', 'nama_pelanggan', dan 'status' sudah terisi." 
    });
  }

  try {
    const { data, error } = await supabase
      .from('items')
      .insert([{ nama_sepatu, nama_pelanggan, status }])
      .select();

    if (error) throw error;

    const formattedData = data.map(item => {
        return {
            ...item,
            created_at: item.created_at.substring(0, 10)
        };
    });

    res.status(201).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_sepatu, nama_pelanggan, status, tanggalSelesai } = req.body;

  const updateData = { nama_sepatu, nama_pelanggan, status, tanggalSelesai };

  if (status && !tanggalSelesai && status.toLowerCase() === 'siap diambil') {
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

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
