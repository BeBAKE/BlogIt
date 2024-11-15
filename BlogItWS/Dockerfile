# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Install TypeScript globally to use `tsc` for building
RUN npm install -g typescript

# Copy the rest of the application code to the working directory
COPY . .

# Compile TypeScript files to JavaScript
RUN tsc

# Expose the port for HTTP server
EXPOSE 3000

# Command to run the compiled application
CMD ["node", "./dist/index.js"]
