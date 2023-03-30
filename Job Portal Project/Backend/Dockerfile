# Use a base image with Node.js pre-installed
FROM node:16.19.1-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ENV PORT=9000

# Expose the port that the server runs on
EXPOSE 9000

# Set the environment variable for MongoDB connection URL
ENV MONGO_URL mongodb+srv://adityarajsahoouser:adityarajsahoo@cluster0.ajk0wyt.mongodb.net/?retryWrites=true&w=majority

# Start the server
CMD ["npm", "start"]