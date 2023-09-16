'use strict';

var Fastify = require('fastify');
var client = require('@prisma/client');

const prisma = new client.PrismaClient();

const fastify = Fastify({
  logger: true
});

// fastify.get('/', (request, reply) => {
//   reply.send({ hello: 'world' })
// })

fastify.get('/todos', async (request, reply) => {
  const todos = await prisma.tasks.findMany();
  reply.send({ data: todos });
});

fastify.get('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const todo = await prisma.tasks.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  reply.send({ data: todo });
});

fastify.post('/todos', async (request, reply) => {
  const { task } = request.body;
  const todo = await prisma.tasks.create({
    data: {
      task
    }
  });
  reply.send({ data: todo });
});

fastify.put('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const { task, completed } = request.body;

  const todo = await prisma.tasks.update({
    where: {
      id: parseInt(id)
    },
    data: {
      task,
      completed
    }
  });

  reply.send({ data: todo });
});

fastify.delete('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const todo = await prisma.tasks.delete({
    where: {
      id: parseInt(id)
    }
  });

  reply.send({ data: todo });
});

const port = process.env.PORT || 3000;
fastify.listen({ port }, (err, address) => {
  if (err) throw err
  console.log(`Server is now listening on http://localhost:${port}`);
});
