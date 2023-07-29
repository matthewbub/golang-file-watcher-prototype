const axios = require('axios');

async function getHelpdesk() {
  const databaseId = process.env.NOTION_HELPDESK_TABLE_ID;
  const headers = {
    Authorization: `Bearer ${process.env.NOTION_KEY}`,
    'Notion-Version': '2022-06-28'
  };

  try {
    const response = await axios.get(`https://api.notion.com/v1/databases/${databaseId}`, { headers });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Request failed with status code ${error.response.status}`);
  }
}

module.exports = { getHelpdesk };