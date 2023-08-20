
<img src="https://bhoyxrelzzohrygasyjt.supabase.co/storage/v1/object/public/public/logo.png" alt="NineMbs Studio Logo" width="100"/>


# IE Portal Services

Hello and welcome to the root directory of IE Portals. This repository consists of several micro services, rest assured that at no-point in the development lifecycle are we reinventing the wheel. 

Whats UCAN?

UCAN stands for User, Content, Access, Network - the four pillars of our application. Want a fun back story? UCAN is shorten from UCAN2, originally stood for "You Can, Too." but we decided to make it an acronym instead.

# Getting Started

Yeah it's just a node application, so you can run it locally or in a container. Containers are preferred, because they align much closer to our production environment. Thee primary difference being the data they read and write to.

First, create a development instance of the application. This will create a `.env` file in the root directory of the application.

```sh
NODE_ENV=development node ucan/admin/exec/create-tables.js
```

```sh
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up --build
```

Production 

```sh
docker-compose down
docker-compose up --build
```

## Architecture

The primary entry point of this application is the `./index.js` file. This file is responsible for starting the Express.js server and loading all the routes. You'll find the functional application code within the `ucan` directory. 