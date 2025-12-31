# Build stage
FROM node:23-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code
COPY . .

# Accept build arguments for environment variables
ARG VITE_SANITY_PROJECT_ID
ARG VITE_SANITY_DATASET
ARG VITE_SANITY_API_VERSION

# Set as environment variables for the build
ENV VITE_SANITY_PROJECT_ID=$VITE_SANITY_PROJECT_ID
ENV VITE_SANITY_DATASET=$VITE_SANITY_DATASET
ENV VITE_SANITY_API_VERSION=$VITE_SANITY_API_VERSION

# Build the application
RUN yarn build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
