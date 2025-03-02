FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Create a .env file at build time
RUN echo "VITE_API_URL=http://localhost:5002" > .env

EXPOSE 8080
# Use development server instead of build
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 