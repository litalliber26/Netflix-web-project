FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Script will exit with 0 on success, non-zero on failure
CMD ["node", "migrations/migrate.js"]