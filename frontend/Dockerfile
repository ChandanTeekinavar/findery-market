# Build stage
FROM node:18 as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm cache clean --force && \
    npm install --legacy-peer-deps

# Build application
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build output and configuration
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Ensure proper permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 