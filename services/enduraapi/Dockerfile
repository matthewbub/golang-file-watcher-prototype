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