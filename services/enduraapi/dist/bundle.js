'use strict';

var Fastify = require('fastify');
var client = require('@prisma/client');
var Joi = require('joi');

const prisma = new client.PrismaClient();

const fastify = Fastify({
  logger: true
});


const todoSchema = Joi.object({
  task: Joi.string().required(),
  completed: Joi.boolean().required(),
  id: Joi.number().required(),
  datecreated: Joi.date().required(),
});

const todoListSchema = Joi.array().items(todoSchema);

const incomingNewTodoSchema = Joi.object({
  task: Joi.string().required()
});

const incomingUpdatedTodoSchema = Joi.object({
  task: Joi.string().required(),
  completed: Joi.boolean().required()
});

const incomingTodoQuerySchema = Joi.object({
  id: Joi.number().required()
});

// fastify.get('/', (request, reply) => {
//   reply.send({ hello: 'world' })
// })

fastify.get('/todos', async (request, reply) => {
  const todos = await prisma.tasks.findMany();

  const { error } = todoListSchema.validate(todos);
  
  if (error) {
    reply.status(500).send({ error: error.message });
    return;
  }

  reply.send({ data: todos });
});

fastify.get('/todos/:id', async (request, reply) => {
  const { id } = request.params;

  const { error: reqParamsError } = incomingTodoQuerySchema.validate({ id });

  if (reqParamsError) {
    reply.status(500).send({ error: reqParamsError.message });
    return;
  }

  const todo = await prisma.tasks.findUnique({
    where: {
      id: parseInt(id)
    }
  });

  reply.send({ data: todo });
});

fastify.post('/todos', async (request, reply) => {
  const { task } = request.body;

  const { error: reqBodyError } = incomingNewTodoSchema.validate({ task });

  if (reqBodyError) {
    reply.status(500).send({ error: reqBodyError.message });
    return;
  }

  const todo = await prisma.tasks.create({
    data: {
      task
    }
  });

  const { error: validationError } = todoSchema.validate(todo);
  
  if (validationError) {
    reply.status(500).send({ error: validationError.message });
    return;
  }

  reply.send({ data: todo });
});

fastify.put('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const { task, completed } = request.body;

  const { error: reqBodyError } = incomingUpdatedTodoSchema.validate({ task, completed });
  const { error: reqParamsError } = incomingTodoQuerySchema.validate({ id });

  if (reqBodyError || reqParamsError) {
    reply.status(500).send({ error: reqBodyError.message || reqParamsError.message });
    return;
  }

  const todo = await prisma.tasks.update({
    where: {
      id: parseInt(id)
    },
    data: {
      task,
      completed
    }
  });

  const { error: validationError } = todoSchema.validate(todo);

  if (validationError) {
    reply.status(500).send({ error: validationError.message });
    return;
  }

  reply.send({ data: todo });
});

fastify.delete('/todos/:id', async (request, reply) => {
  const { id } = request.params;

  const { error: reqParamsError } = incomingTodoQuerySchema.validate({ id });

  if (reqParamsError) {
    reply.status(500).send({ error: reqParamsError.message });
    return;
  }

  const todo = await prisma.tasks.delete({
    where: {
      id: parseInt(id)
    }
  });

  const { error: validationError } = todoSchema.validate(todo);

  if (validationError) {
    reply.status(500).send({ error: validationError.message });
    return;
  }

  reply.send({ data: todo });
});

const port = process.env.PORT || 3000;
fastify.listen({ port }, (err) => {
  if (err) throw err
  console.log(`Server is now listening on http://localhost:${port}`);
});
