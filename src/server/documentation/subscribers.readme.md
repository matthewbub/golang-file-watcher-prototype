# Subscribers API



## Endpoints

### `GET` - `/api/v1/subscribers`

```bash
CURL -X GET http://localhost:3000/api/v1/subscribers

# Response
[
  {
    "email": "example@email.com",
    "id": 1,
  },
  {
    "email": "example2@email.com",
    "id": 2,
  },
  # ...
]
```

### `POST` - `/api/v1/subscribers`

```bash
curl -X POST http://localhost:3000/api/v1/subscribers \
  -H "Content-Type: application/json" \
  -d '{
    "email": "example@email.com"
  }'
```

### `PUT` - `/api/v1/subscribers/:id`

```bash
curl -X PUT http://localhost:3000/api/v1/subscribers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "email": "example@email.com"
  }'
```

### `DELETE` - `/api/v1/subscribers/:id`

```bash
curl -X DELETE http://localhost:3000/api/v1/subscribers/1
```

### `GET` - `/api/v1/subscribers/:id`

```bash
curl -X GET http://localhost:3000/api/v1/subscribers/1
```
