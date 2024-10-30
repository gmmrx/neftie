# Stage 1: Install dependencies
FROM node:20 AS dependencies
WORKDIR /app
COPY package.json ./
COPY .env /
RUN npm install --legacy-peer-deps

# Stage 2: Build the application
FROM node:20 AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Production runner
FROM node:20 AS runner
WORKDIR /app

# Set NODE_ENV to production for optimized builds
ENV NODE_ENV=production

# Copy required files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env 

# Expose the desired port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
