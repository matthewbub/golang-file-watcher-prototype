# Database Operation Handlers

This module exports functions that handle various database operations.

```js
const {
  handleGet,
  handlePost,
  handlePut,
  handleDelete,
  handleGetById,
} = require('../helpers/databaseOperations');
```

### `handleGet(res, table, [select='*'])`

Handles GET requests.

- `res` (Object): The response object.
- `table` (Object): The table object.
- `select` (string, optional): The select statement. Defaults to '*'.
- Returns: A promise that resolves when the request is handled.
- Example usage:

```js
await handleGet(res, table, 'column1, column2');
```

### `handlePost(res, table, insertData)`

Handles POST requests.

- `res` (Object): The response object.
- `table` (Object): The table object.
- `insertData` (Object): The data to insert.
- Returns: A promise that resolves when the request is handled.
- Example usage:

```js
await handlePost(res, table, { column1: 'value1', column2: 'value2' });
```

### `handlePut(res, table, id, updateData)`
Handles PUT requests.

- `res` (Object): The response object.
- `table` (Object): The table object.
- `id` (number): The ID of the row to update.
- `updateData` (Object): The data to update.
- Returns: A promise that resolves when the request is handled.
- Example usage:

```js
await handlePut(res, table, 1, { column1: 'value1', column2: 'value2' });
```

### `handleDelete(res, table, id)`

Handles DELETE requests.

- `res` (Object): The response object.
- `table` (Object): The table object.
- `id` (number): The ID of the row to delete.
- Returns: A promise that resolves when the request is handled.
- Example usage:

```js
await handleDelete(res, table, 1);
```

### `handleGetById(res, table, id, [select='*'])`

Handles GET requests by ID.

- `res` (Object): The response object.
- `table` (Object): The table object.
- `id` (number): The ID of the row to get.
- `select` (string, optional): The select statement. Defaults to '*'.
- Returns: A promise that resolves when the request is handled.
- Example usage:

```js
await handleGetById(res, table, 1, 'column1, column2');
```
