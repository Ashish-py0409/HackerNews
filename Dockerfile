# Base image
FROM node:18

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Update package lists and install necessary tools 
RUN apt-get update && apt-get install -y curl

# Set the working directory in the container
WORKDIR /app

# Copy your playwright script and pakage.json/package-lock.json
COPY package*.json ./

# Install your script's dependecies
RUN npm install

# Copy the rest of the application files 
COPY . .

# Command to run your playwright script
CMD [ "npm", "run", "test:regression" ]