# Use the official Node.js image as the base image for the backend
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the server will run on
EXPOSE 5001

# Start the server
CMD ["node", "index.js"]