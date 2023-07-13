/**
 * Handles GET requests.
 *
 * @param {Object} res - The response object.
 * @param {Object} table - The table object.
 * @param {string} [select='*'] - The select statement.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
const handleGet = async (res, table, select = '*') => {
  const { data, error } = await table.select(select);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
}

/**
 * Handles POST requests.
 *
 * @param {Object} res - The response object.
 * @param {Object} table - The table object.
 * @param {Object} insertData - The data to insert.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
const handlePost = async (res, table, insertData) => {
  const { data, error } = await table.insert(insertData).single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({ data });
}

/**
 * Handles PUT requests.
 *
 * @param {Object} res - The response object.
 * @param {Object} table - The table object.
 * @param {string} id - The ID of the record to update.
 * @param {Object} updateData - The data to update.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
const handlePut = async (res, table, id, updateData) => {
  const { data, error } = await table.update(updateData).eq('id', id).single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
}

/**
 * Handles DELETE requests.
 *
 * @param {Object} res - The response object.
 * @param {Object} table - The table object.
 * @param {string} id - The ID of the record to delete.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
const handleDelete = async (res, table, id) => {
  const { data, error } = await table.delete().eq('id', id).single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
}

/**
 * Handles GET requests by ID.
 *
 * @param {Object} res - The response object.
 * @param {Object} table - The table object.
 * @param {string} id - The ID of the record to retrieve.
 * @param {string} [select='*'] - The select statement.
 * @returns {Promise<void>} - A promise that resolves when the request is handled.
 */
const handleGetById = async (res, table, id, select = '*') => {
  const { data, error } = await table.select(select).eq('id', id).single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ data });
}

module.exports = {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  handleGetById
};
