# build frontend with node.js
FROM node:18-alpine AS builder

# define environment variables as arguments
ARG REACT_APP_CLOUDINARY_NAME
ARG REACT_APP_CLOUDINARY_KEY
ARG REACT_APP_CLOUDINARY_SECRET

# transform arguments to environment variables
ENV REACT_APP_CLOUDINARY_NAME=$REACT_APP_CLOUDINARY_NAME
ENV REACT_APP_CLOUDINARY_KEY=$REACT_APP_CLOUDINARY_KEY
ENV REACT_APP_CLOUDINARY_SECRET=$REACT_APP_CLOUDINARY_SECRET

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
