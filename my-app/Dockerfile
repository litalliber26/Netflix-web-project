# Step 1: Build the React App
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Inject API_URL into React's build process
ARG API_URL
ENV REACT_APP_API_URL=$API_URL

# Build the React application
RUN npm run build

# Step 2: Serve the React App using Nginx
FROM nginx:alpine

# Copy the built React app from builder stage to Nginx's serving directory
COPY --from=builder /app/build /usr/share/nginx/html

# Set Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 3001
EXPOSE 3001

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]