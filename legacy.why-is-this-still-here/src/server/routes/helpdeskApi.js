const { Client } = require("@notionhq/client")
const express = require('express');
const router = express.Router();

const { getHelpdesk } = require('../helpers/helpdeskOperations');

router.get('/api/v1/help-desk', async (req, res) => {
  const response = await getHelpdesk();
  res.json(response);
});

module.exports = router;