# Stage 1: Build dependency trees safely
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build the hardened production runtime container
FROM node:18-alpine
RUN apk add --no-cache tini
WORKDIR /usr/src/app
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY server.js ./

# Enforce secure least-privilege administrative standards
USER node
EXPOSE 5000

# Use tini to handle system kernel signals and prevent ghost zombie processes
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
