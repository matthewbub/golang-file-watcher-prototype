1. Node app with Rollup
2. PostgreSQL on MacOS for Dummies

We'll need to modify some scripts within our `package.json` file as to have a smoother development experience.  

First let's install `nodemon` and `concurrently`:

```shell
npm i nodemon concurrently --save-dev
```

then we can modify our `package.json` file:

```json
"scripts": {
  "dev": "concurrently \"npm run dev:compile\" \"npm run dev:server\"",
  "dev:compile": "rollup -c -w",
  "dev:server": "nodemon ./dist/bundle.js"
},
```

now we can run our app in development mode, this is the mode we'll use while we're developing our app:

```shell
npm run dev
```

cool, now let's install prisma.

```shell
npm i prisma --save-dev
```

then we can initialize prisma:

```shell
npx prisma init 

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.
```

Prisma usually defaults to PostgreSQL but you can confirm that in your `schema.prisma` file. If you aren't using PostgreSQL, you can change the provider to match your database.

Run prisma db pull to turn your database schema into a Prisma schema.

```shell
npx prisma db pull
```

Run prisma generate to generate the Prisma Client. You can then start querying your database.

```shell
npx prisma generate
```

Then in the app:

```js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

That's all there is to Prisma initialization. You can now start querying your database.

Let's add a get route:

```js
fastify.get('/todos', async (request, reply) => {
  const todos = await prisma.tasks.findMany()
  reply.send({ data: todos })
})
```

and a post route:

```js
fastify.post('/todos', async (request, reply) => {
  const { task } = request.body
  const todo = await prisma.tasks.create({
    data: {
      task
    }
  })
  reply.send({ data: todo })
})
```

If you've been running your app in development mode, you're good to go.  If not, you'll need to build your app, then we can test the app with curl:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"task":"Learn Prisma"}' http://localhost:3000/todos
```

```shell
curl http://localhost:3000/todos
```

your rollup build may produce warnings, you can list prisma and @prisma/client as external dependencies in your rollup config to avoid these warnings:

```js
// ...
external: ['fastify', 'prisma', '@prisma/client']
// ...
```

go ahead and execute another build, and you should see no warnings. You may also notice that the time it takes to build your app has decreased significantly.

```shell
npm run build
```

Now lets create a route that will allow us to get a single task by id:

```js
fastify.get('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const todo = await prisma.tasks.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  reply.send({ data: todo })
})
```

and a route to update a task:

```js
fastify.put('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const { task } = request.body;
  const todo = await prisma.tasks.update({
    where: {
      id: parseInt(id)
    },
    data: {
      task
    }
  })

  reply.send({ data: todo })
})
```

and a route to delete a task:

```js
fastify.delete('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const todo = await prisma.tasks.delete({
    where: {
      id: parseInt(id)
    }
  })

  reply.send({ data: todo })
})
```

now we can build and run the app:

```shell
npm run build
```

```shell
npm start
```

and then we can test the app with curl:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"task":"Learn Prisma"}' http://localhost:3000/todos
```

```shell
curl http://localhost:3000/todos
```

```shell
curl -X PUT -H "Content-Type: application/json" -d '{"task":"Learn Prisma and Fastify"}' http://localhost:3000/todos/1
```

```shell
curl http://localhost:3000/todos/1
```

```shell
curl -X DELETE http://localhost:3000/todos/1
```

```shell
curl http://localhost:3000/todos
```

everything should be working as expected at this point.

cool, next lets add some sort of validation to our routes.  We aren't using TypeScript in this demonstration, so we [won't be able to take advantage of Fastify's built in validation](https://fastify.dev/docs/latest/Reference/Type-Providers). Instead we'll use Joi to validate the data coming into our routes.

first lets install Joi:

```shell
pnpm i joi
```

we can also add joi to the `externals` array in our rollup config:

```js
// ...
external: ['fastify', 'prisma', '@prisma/client', 'joi']
// ...
```

now we could create a schema for each route, but that would be a lot of duplication.  Instead lets create a schema for our todo items, and then we can use that schema in each of our routes.

This could go in a separate file, but for simplicity we'll just add it to the top of our server.js file:

```js
import Joi from 'joi';

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
```

now we can use these schemas in our routes. Let's start with the GET route we created earlier:

```js
fastify.get('/todos', async (request, reply) => {
  const todos = await prisma.tasks.findMany()

  const { error } = todoListSchema.validate(todos);
  
  if (error) {
    reply.status(500).send({ error: error.message });
    return;
  }

  reply.send({ data: todos })
})
```

then we can move on to the POST route:

```js
fastify.post('/todos', async (request, reply) => {
  const { task } = request.body

  const { error: reqBodyError } = incomingNewTodoSchema.validate({ task });

  if (reqBodyError) {
    reply.status(500).send({ error: reqBodyError.message });
    return;
  }

  const todo = await prisma.tasks.create({
    data: {
      task
    }
  })

  const { error: validationError } = todoSchema.validate(todo);
  
  if (validationError) {
    reply.status(500).send({ error: validationError.message });
    return;
  }

  reply.send({ data: todo })
})
```

next, the get route for a single todo item:

```js
fastify.get('/todos/:id', async (request, reply) => {
  const { id } = request.params;
  const { error: queryParamError } = incomingTodoQuerySchema.validate({ id: parseInt(id) });
  
  // throw an error if the query params are invalid
  if (queryParamError) {
    throw new Error(queryParamError);
  }

  const todo = await prisma.tasks.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  const { error: todoError } = todoSchema.validate({
    id: todo.id,
    task: todo.task,
    completed: todo.completed,
    datecreated: todo.datecreated
  });

  // throw an error if the todo is invalid
  // this is less likely to be invalid, but it's still possible
  if (todoError) {
    throw new Error(todoError);
  }

  reply.send({ data: todo })
})
```

here's the put route:

```js
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

  reply.send({ data: todo })
})
```

and finally the delete route:

```js
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
  })

  const { error: validationError } = todoSchema.validate(todo);

  if (validationError) {
    reply.status(500).send({ error: validationError.message });
    return;
  }

  reply.send({ data: todo })
})
```

cool, that's a full CRUD API with validation.  Next let's add some error handling to our app.  We'll start by adding a generic error handler to the bottom of our server.js file:

lets get this bad boy building with docker. First, let's stop the development server if it's running.

```shell
cmd + c
```

then we can create a `dockerfile`:

```dockerfile
# Use the specific version of Node.js.
FROM node:18.4.0

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies using pnpm
RUN pnpm install

# Bundle app source
COPY . .

# Build the app
RUN pnpm run build

# Your start command
CMD [ "pnpm", "run", "start" ]

# If your app runs on a specific port, for example 3000, expose that port
EXPOSE 3000
```

then we can build the image:

```shell
docker build -t task-app .
```

and run the image:

```shell
docker run -p 3000:3000 task-app
```

Before Docker will play nice, we need to modify the `binaryTargets` array in our `priisma.schema` file:

```prisma
binaryTargets = ["native", "linux-arm64-openssl-1.1.x"]
```

then we can run the prisma generate command again:

```shell
npx prisma generate
```

and then we can build and run the image again:

```shell
docker ls -a 
docker stop <container id>
docker build -t task-app .
docker run -p 3000:3000 task-app
```

and we can test the app with curl:

```shell
curl http://localhost:3000/todos
```

That was weird, nothing happened. Turns out, docker is only listening from inside itself.

To make your application accessible from outside the Docker container, you should have your Node.js application listen to `0.0.0.0` instead of `localhost` or `127.0.0.1`.

The `0.0.0.0` IP address means "all IPv4 addresses on the local machine". So, if a server is set to listen on `0.0.0.0`, it will be reachable at all network interfaces (including the Docker network interface).

We need to slightly modify the fastify entry point in our `server.js` file:

```js
const port = process.env.PORT || 3000
fastify.listen({port, host: '0.0.0.0'}, (err, address) => {
  if (err) throw err
  console.log(`Server is now listening on ${address}`)
})
```

then we can build and run the image again:

```shell
docker ls -a 
docker stop <container id>
docker build -t task-app .
docker run -p 3000:3000 task-app
```

This is great but now we've got another problem. We can't connect to our database.

We'll need to create a docker-compose file to get our database running in docker as well.

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      DATABASE_URL: postgresql://prisma:prisma@db:5432/tasks
  db:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: prisma
      POSTGRES_PASSWORD: prisma
      POSTGRES_DB: tasks
```
