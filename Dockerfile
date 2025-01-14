# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Install PM2 globally
RUN npm install pm2 -g

# Expose the port your app will run on
EXPOSE 3001

# Start your app using PM2 with multiple instances
CMD ["pm2-runtime", "start", "index.js", "--instances", "max", "--env", "production"]
