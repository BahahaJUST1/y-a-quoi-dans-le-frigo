# build frontend with node.js
FROM node:18-alpine AS builder

# definition of main directory
WORKDIR /app

# copy installation and dependency files
COPY package.json package-lock.json ./
RUN npm install

# copy source code
COPY . .

# build application
RUN npm run build

# Serveur Nginx pour servir les fichiers React
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
