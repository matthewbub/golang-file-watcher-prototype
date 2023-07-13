const express = require('express');
const router = express.Router();
const { supabase } = require('../supabase.config');

router.get("/api/v1/locales", async (_, res) => {
  const { data, error } = await supabase
    .from('locales')
    .select('*')

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

router.post('/api/v1/locales', async (req, res) => {
  const { locale, message, message_key, screen_id } = req.body;
  const { data, error } = await supabase
    .from('locales')
    .insert([{ locale, message, message_key, screen_id }])
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(201).json({ data })
  }
});

router.put('/api/v1/locales/:id', async (req, res) => {
  const { id } = req.params;
  const { locale, message, message_key } = req.body;
  const { data, error } = await supabase
    .from('locales')
    .update({ locale, message, message_key })
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

router.delete('/api/v1/locales/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('locales')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

module.exports = router;
