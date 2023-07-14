# Screens API

This module exports an Express router for handling the Screen API endpoints.

## Endpoints

### `GET` - `/api/v1/screens`

Returns a list of screens.

```bash
CURL -X GET http://localhost:3000/api/v1/screens

# Response
[
  {
    "screen_name": "landing",
    "id": 1,
  },
  {
    "screen_name": "about",
    "id": 2,
  },
  # ...
]
```

### `POST` - `/api/v1/screens`

Create a new screen. Note the `screen_name` is a unique key for the screen and should be used to reference the screen in the application.

```bash
curl -X POST http://localhost:3000/api/v1/screens \
  -H "Content-Type: application/json" \
  -d '{
    "screen_name": "landing"
  }'
```

### `PUT` - `/api/v1/screens/:id`

Update an existing screen by ID.

```bash
curl -X PUT http://localhost:3000/api/v1/screens/1 \
  -H "Content-Type: application/json" \
  -d '{
    "screen_name": "landing"
  }'
```

### `DELETE` - `/api/v1/screens/:id`

Delete an existing screen by ID.

```bash
curl -X DELETE http://localhost:3000/api/v1/screens/1
```

### `GET` - `/api/v1/screens/:id`

Get an existing screen by ID.

```bash
curl -X GET http://localhost:3000/api/v1/screens/1
```
