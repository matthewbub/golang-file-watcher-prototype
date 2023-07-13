const express = require('express');
const router = express.Router();
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  handleGetById
} = require('../helpers/databaseOperations');
const { supabase } = require('../supabase.config');
const table = supabase.from('messages');

router.get("/api/v1/locales", (_, res) => handleGet(res, table));

router.post('/api/v1/locales', (req, res) => {
  const { locale, message, message_key, screen_id } = req.body;
  handlePost(res, table, [{ locale, message, message_key, screen_id }]);
});

router.put('/api/v1/locales/:id', (req, res) => {
  const { id } = req.params;
  const { locale, message, message_key } = req.body;
  handlePut(res, table, id, { locale, message, message_key });
});

router.delete('/api/v1/locales/:id', (req, res) => {
  const { id } = req.params;
  handleDelete(res, table, id);
});

router.get('/api/v1/locales/:id', (req, res) => {
  const { id } = req.params;
  handleGetById(res, table, id);
});

module.exports = router;
