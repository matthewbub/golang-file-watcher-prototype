---
tags: [micro, nodejs, rollup] 
description: "Build an Web Server with Nodejs and Fastify"
---
 
# Build an Web Server with Nodejs and Fastify

Fastify is a powerful and efficient web framework for Node.js, designed to handle high load scenarios with low latency and high throughput. It's built on a modular architecture, which makes it highly extensible and flexible.

In this tutorial, we'll be building a basic Node.js application using Fastify from scratch. We'll walk through setting up the project, installing necessary dependencies, configuring Fastify, and writing our server code.

## Step 1: Project Initialization

Start by creating a new directory for your project and navigating into it:

```shell
mkdir fastify-app && cd fastify-app
```

Next, initialize a new Node.js project by running npm init and following the prompts. For simplicity, you can press return to accept the default settings:

```shell
npm init -y
```

This command generates a new `package.json` file in your project root.

## Step 2: Installing Necessary Dependencies

We need to install Fastify for our web server:

```shell
npm install fastify
```

## Step 3: Configuring Fastify

In your project root, create a new file named `server.js` and add the following content:

```js
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(Server is now listening on ${address})
})
```

This script sets up a Fastify instance with logging enabled, defines a simple GET route, and starts the server on port 3000.

## Step 4: Running Your Application

To run your application, add the following start script to your `package.json`:

```json
"scripts": {
  "start": "node server.js"
}
```

You can now run your application by executing npm start. This command runs the server.js file, and you should see a log message indicating that your server is running at `http://localhost:3000`.

By navigating to `http://localhost:3000` in your browser, you'll see the JSON response `{ hello: 'world' }` from your Fastify server.

## Step 5: Adding Schema Validation to your Routes

Schema validation in Fastify allows you to establish consistent response patterns throughout your API routes. It also helps validate the incoming requests and format outgoing responses. Here's how you can add schema validation to your GET route:

```js
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: 'object',
      properties: {
          name: { type: 'string'}
      },
      required: ['name'],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: async (request, reply) => {
    return { hello: `Hello, ${request.query.name}!` }
  }
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  console.log(`Server is now listening on ${address}`)
})
```

In this example, we've added a query string validation to the GET route. The request is expected to have a query string with a `'name'` parameter. The response will be an object with a `'hello'` property. If you try to access the route without the `'name'` query parameter, Fastify will return a `400` Bad Request error.

To test this, navigate to `http://localhost:3000/?name=YourName` in your browser. You'll see the JSON response `{ hello: 'Hello, YourName!' }` from your Fastify server.

Adding schema validation helps ensure that your API is used correctly and consistently, and it can also improve the performance of your application by reducing the need for manual data validation.

## Step 6: Adding a POST Request with Schema Validation

Fastify's schema validation system isn't limited to GET requests. You can also use it to validate POST requests and ensure that the request body matches an expected format. Here's how you can add a POST route with schema validation to your Fastify server:

First, let's define our route:

```js
fastify.route({
  method: 'POST',
  url: '/users',
  schema: {
    // The request body must be an object with a `name` and an `email`.
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
      required: ['name', 'email'],
    },
    // The response will be an object with a `user` property.
    response: {
      200: {
        type: 'object',
        properties: {
          user: { type: 'object', properties: {name: {type: 'string'}, email: {type: 'string'}} }
        }
      }
    }
  },
  handler: async (request, reply) => {
    // For this example, we'll just echo back the user data.
    // In a real application, you might store this in a database.
    return { user: request.body }
  }
})
```

In this example, we've added a POST route at `/users`. The request body is expected to be an object with a `'name'` and an `'email'` property. If the request body does not match this schema, Fastify will automatically reject the request with a `400` Bad Request error.

To test this, you can use a tool like curl or Postman to send a POST request to `http://localhost:3000/users` with a JSON body like `{"name": "Alice", "email": "alice@example.com"}`. You should see a response with the same user data.

This feature can be used to ensure that your API receives data in the correct format, reducing the need for manual validation. It also provides your API consumers with clear expectations about what data they should send.