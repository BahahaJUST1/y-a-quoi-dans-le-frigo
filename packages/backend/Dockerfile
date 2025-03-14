# node.js docker image
FROM node:18-alpine

# definition of main directory
WORKDIR /app

# copy installation and dependency files
COPY package.json package-lock.json ./
RUN npm install --only=production

# copy source code
COPY . .

# build application
RUN npm install -g @nestjs/cli
RUN npm run build

# exposition of NestJS port
EXPOSE 3000

# startup command
CMD ["npm", "run", "start"]
