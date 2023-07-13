import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ViteExpress from "vite-express";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey)

const app = express();
app.use(express.json());


app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

// Locale API
app.get("/api/v1/locales", async (_, res) => {
  const { data, error } = await supabase
    .from('locales')
    .select('*')

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

app.post('/api/v1/locales', async (req, res) => {
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

app.put('/api/v1/locales/:id', async (req, res) => {
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

app.delete('/api/v1/locales/:id', async (req, res) => {
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

// Screens API
app.get("/api/v1/screens", async (_, res) => {
  const { data, error } = await supabase
    .from('screens')
    .select('*')

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

app.post('/api/v1/screens', async (req, res) => {
  const { screen_name } = req.body;
  const { data, error } = await supabase
    .from('screens')
    .insert([{ screen_name }])

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(201).json({ data })
  }
});

app.put('/api/v1/screens/:id', async (req, res) => {
  const { id } = req.params;
  const { screen_name } = req.body;
  const { data, error } = await supabase
    .from('screens')
    .update({ screen_name })
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

app.delete('/api/v1/screens/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase

    .from('screens')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});


// Subscribe API
app.get("/api/v1/subscribers", async (_, res) => {
  const { data, error } = await supabase
    .from('subscribers')
    .select('*')

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

app.post('/api/v1/subscribe', async (req, res) => {
  const { email } = req.body;
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }])

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(201).json({ data })
  }
});

app.put('/api/v1/subscribers/:id', async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  const { data, error } = await supabase
    .from('subscribers')
    .update({ email })
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

app.delete('/api/v1/subscribers/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('subscribers')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

// Tenant API
app.get("/api/v1/tenants", async (_, res) => {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }
});

app.post('/api/v1/tenants', async (req, res) => {
  const { tenant_name } = req.body;
  const { data, error } = await supabase
    .from('tenants')
    .insert([{ tenant_name }])
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(201).json({ data })
  }

});

app.put('/api/v1/tenants/:id', async (req, res) => {
  const { id } = req.params;
  const { tenant_name } = req.body;
  const { data, error } = await supabase
    .from('tenants')
    .update({ tenant_name })
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }

});

app.delete('/api/v1/tenants/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from('tenants')
    .delete()
    .eq('id', id)
    .single();

  if (error) {
    res.status(500).json({ error: error.message })
  } else {
    res.status(200).json({ data })
  }

});





ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
