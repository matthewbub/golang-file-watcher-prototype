const express = require('express');
const router = express.Router();
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  handleGetById
} = require('../helpers/databaseOperations');
const { supabase } = require('./supabase.config');

const table = supabase.from('screens');

// Screens API Routes
router.get('/api/v1/screens', (req, res) => {
  handleGet(res, table);
});

router.get('/api/v1/screens/:id', (req, res) => {
  const { id } = req.params;
  handleGetById(res, table, id);
});

router.post('/api/v1/screens', (req, res) => {
  const { screen_name } = req.body;
  handlePost(res, table, [{ screen_name }]);
});

router.put('/api/v1/screens/:id', (req, res) => {
  const { id } = req.params;
  const { screen_name } = req.body;
  handlePut(res, table, id, { screen_name });
});

router.delete('/api/v1/screens/:id', (req, res) => {
  const { id } = req.params;
  handleDelete(res, table, id);
});

module.exports = router;
