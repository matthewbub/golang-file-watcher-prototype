# Locale API

This module exports an Express router for handling Locale API endpoints.

## Endpoints

### `GET` - `/api/v1/locales`

Returns a list of localized messages. 

```bash
CURL -X GET http://localhost:3000/api/v1/locales

# Response
[
  {
    "locale": "en-US",
    "message": "Hello!",
    "message_key": "greeting",
    "screen_id": 1
  },
  {
    "locale": "fr-FR",
    "message": "Bonjour!",
    "message_key": "greeting",
    "screen_id": 1
  },
  # ...
]
```

### `POST` - `/api/v1/locales`

Create a new localized message. Note the `screen_id` is a foreign key to the `screens` table. The `message_key` is a unique key for the message and should be used to reference the message in the application. This means all locales for a given `message` should have the same `message_key`.

```bash
curl -X POST http://localhost:3000/api/v1/locales \
  -H "Content-Type: application/json" \
  -d '{
    "locale": "en-US",
    "message": "Hello!",
    "message_key": "greeting",
    "screen_id": 1
  }'
```

### `PUT` - `/api/v1/locales/:id`

Update an existing localized message by ID. Note the `screen_id` is a foreign key to the `screens` table.

```bash
curl -X PUT http://localhost:3000/api/v1/locales/1 \
  -H "Content-Type: application/json" \
  -d '{
    "locale": "en-US",
    "message": "Hello, world!",
    "message_key": "greeting",
    "screen_id": 1
  }'
```

### `DELETE` - `/api/v1/locales/:id`

Delete an existing localized message by ID.

```bash
curl -X DELETE http://localhost:3000/api/v1/locales/1
```

### `GET` - `/api/v1/locales/:id`

Get an existing localized message by ID.

```bash
curl -X GET http://localhost:3000/api/v1/locales/1
```
