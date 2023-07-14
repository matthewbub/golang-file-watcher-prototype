const express = require('express');
const router = express.Router();
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete
} = require('./databaseOperations');
const { supabase } = require('./supabase.config');
const table = supabase.from('time_logs');

// timelog API Routes
router.get('/api/v1/timelog', (req, res) => {
  handleGet(res, table);
});

router.get('/api/v1/timelog/:id', (req, res) => {
  const { id } = req.params;
  handleGetById(res, table, id);
});

router.post('/api/v1/timelog', (req, res) => {
  const { task, description, hours, minutes, start_time } = req.body;
  handlePost(res, table, [{ task, description, hours, minutes, start_time }]);
});

router.put('/api/v1/timelog/:id', (req, res) => {
  const { id } = req.params;
  const { task, description, hours, minutes, start_time } = req.body;
  handlePut(res, table, id, { task, description, hours, minutes, start_time });
});

router.delete('/api/v1/timelog/:id', (req, res) => {
  const { id } = req.params;
  handleDelete(res, table, id);
});

module.exports = router;
