FROM node:16-alpine

WORKDIR /app

# Add non-root user
RUN addgroup -g 1001 nodegroup && \
    adduser -u 1001 -G nodegroup -s /bin/sh -D nodeuser && \
    chown -R nodeuser:nodegroup /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Set ownership of all files to nodeuser
RUN chown -R nodeuser:nodegroup /app

# Switch to nodeuser
USER nodeuser

ENV VITE_PORT=5173
ENV HOST=0.0.0.0

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]