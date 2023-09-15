// - HTTP Methods: Determine which HTTP methods (GET, POST, PUT, DELETE) will be used for each endpoint.
  // - `GET /todos` - Fetch all tasks
  // - `GET /todos/:id` - Fetch a specific task
  // - `POST /todos` - Create a new task
  // - `PUT /todos/:id` - Update a task
  // - `DELETE /todos/:id` - Delete a task
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.get('/todos', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.get('/todos/:id', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.post('/todos', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.put('/todos/:id', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.delete('/todos/:id', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(`Server is now listening on http://localhost:${address}`)
})