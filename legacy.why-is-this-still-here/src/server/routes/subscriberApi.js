const express = require('express');
const router = express.Router();
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete
} = require('../helpers/databaseOperations');
const { supabase } = require('../supabase.config');
const table = supabase.from('subscribers');

// Subscribers API Routes
router.get('/api/v1/subscribers', (req, res) => {
  handleGet(res, table);
});

router.get('/api/v1/subscribers/:id', (req, res) => {
  const { id } = req.params;
  handleGetById(res, table, id);
});

router.post('/api/v1/subscribe', (req, res) => {
  const { email } = req.body;
  handlePost(res, table, [{ email }]);
});

router.put('/api/v1/subscribers/:id', (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  handlePut(res, table, id, { email });
});

router.delete('/api/v1/subscribers/:id', (req, res) => {
  const { id } = req.params;
  handleDelete(res, table, id);
});

module.exports = router;
