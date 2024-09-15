# Stage 1: Build the React application
FROM node:20 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application for production
RUN npm run build

# Stage 2: Serve the static files using Nginx
FROM nginx:stable-alpine

# Copy the built React app from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to serve the React app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
