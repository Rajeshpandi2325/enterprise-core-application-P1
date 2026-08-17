# Stage 1: Build and compile single-page static assets
FROM node:18-alpine AS build-engine
WORKDIR /app
COPY package*.json ./
# FIXED: Swapping clean-install for normal install to handle bare package manifests
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve compiled static HTML/JS assets using web-optimized Nginx
FROM nginx:1.25-alpine

# Purge any default configurations to avoid server mapping collisions
RUN rm -rf /etc/nginx/conf.d/*

COPY --from=build-engine /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
