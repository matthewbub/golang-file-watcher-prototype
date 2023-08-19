
<img src="https://bhoyxrelzzohrygasyjt.supabase.co/storage/v1/object/public/public/logo.png" alt="NineMbs Studio Logo" width="100"/>


# IE Portal Services

Hello and welcome to the root directory of IE Portals. This repository consists of several micro services, rest assured that at no-point in the development lifecycle are we reinventing the wheel. 

### IEP Bus

Our Express.js server.

### IEP JS Helpers

Helper functions that can be used in server services and web services.

### IEP Web

We're using [Ant Design](https://ant.design/) for our UI Component Framework, in junction with React for the actual web framework and Vite for the compiler.

# Getting Started

Local development 

```sh
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.local.yml up --build
```

Production 

```sh
docker-compose down
docker-compose up --build
```