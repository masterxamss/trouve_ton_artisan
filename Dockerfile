# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /trouve_ton_artisan

# Copy the application files into the working directory
COPY . /trouve_ton_artisan

# Install the application dependencies
RUN npm install

# Build the React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]