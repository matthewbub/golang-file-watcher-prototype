1. Node app with Rollup
2. PostgreSQL on MacOS for Dummies


```shell
npm i prisma --save-dev
```

```shell
npx prisma init 

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.
```

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.

```shell
npx prisma db pull
```

```shell
npx prisma generate
```

Then in the app:
```js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```

Now we can add a get route to the app:

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

cool, next lets add some sort of validation to our routes. We can use fastify's built in validation for this:

```js
fastify.post('/todos', {
  schema: {
    body: {
      type: 'object',
      properties: {
        task: { type: 'string' }
      },
      required: ['task']
    }
  }
}, async (request, reply) => {
  const { task } = request.body
  const todo = await prisma.tasks.create({
    data: {
      task
    }
  })
  reply.send({ data: todo })
})
```

```js