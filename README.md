# FinderyMart E-Commerce Platform

## Overview

FinderyMart is a modern, full-stack e-commerce platform built with microservices architecture. It provides a seamless shopping experience with features like product browsing, cart management, and order processing with Cash on Delivery payment option.

![FinderyMart](https://your-screenshot-url.com) <!-- TODO: Add actual screenshot -->

## Features

### Customer Features
- **Product Management**
  - Browse products by category
  - Search functionality
  - Sort by price and name
  - Detailed product views

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Real-time total calculation

- **Checkout Process**
  - Shipping information collection
  - Order review
  - Cash on Delivery payment
  - Order confirmation

- **User Management**
  - User registration and authentication
  - Profile management
  - Order history

### Technical Features
- Microservices Architecture
- Docker Containerization
- React Frontend with Material-UI
- TypeScript Implementation
- Redux State Management
- RESTful APIs
- Mock Data Integration

## Technology Stack

### Frontend
- React 18
- TypeScript
- Material-UI v5
- Redux Toolkit
- Vite
- Emotion (CSS-in-JS)

### Backend Services
- Node.js
- Express
- MongoDB
- PostgreSQL
- Redis
- RabbitMQ

### Infrastructure
- Docker
- Nginx
- Docker Compose

## Project Structure

```
findery-market/
├── frontend/                 # React frontend application
├── user-service/            # User authentication and management
├── product-service/         # Product catalog and management
├── order-service/           # Order processing
├── payment-service/         # Payment processing
├── notification-service/    # Email notifications
├── docker/                  # Docker configuration files
│   └── postgres/
│       └── init/           # Database initialization scripts
├── docker-compose.yml      # Docker compose configuration
└── README.md
```

## Prerequisites

- Docker (version 20.10.0 or higher)
- Docker Compose (version 2.0.0 or higher)
- Node.js (version 18 or higher) - for local development
- npm (version 8 or higher) - for local development

## Getting Started

### Local Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/findery-market.git
   cd findery-market
   ```

2. Environment Setup:
   ```bash
   # Copy example environment files
   cp user-service/.env.example user-service/.env
   cp product-service/.env.example product-service/.env
   cp order-service/.env.example order-service/.env
   cp payment-service/.env.example payment-service/.env
   cp notification-service/.env.example notification-service/.env
   ```

3. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:80
   - API Documentation: http://localhost:3001/api-docs (User Service)
   - RabbitMQ Management: http://localhost:15672
   - Redis Commander: http://localhost:8081

### Development Workflow

1. Frontend Development:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. Making Changes:
   - Make your changes
   - Build the frontend: `npm run build`
   - Rebuild containers: `docker-compose up --build`


## API Documentation

Each service exposes its own API documentation:

- User Service: http://localhost:3001/api-docs
- Product Service: http://localhost:3002/api-docs
- Order Service: http://localhost:3003/api-docs
- Payment Service: http://localhost:3004/api-docs
- Notification Service: http://localhost:3005/api-docs

## Deployment

### Current Deployment Method (Docker Compose)

1. Ensure Docker and Docker Compose are installed on your server

2. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/findery-market.git
   cd findery-market
   ```

3. Set up environment variables:
   ```bash
   # Set up all required .env files as mentioned in Local Development Setup
   ```

4. Build and start the services:
   ```bash
   docker-compose up -d --build
   ```

5. Verify all services are running:
   ```bash
   docker-compose ps
   ```

### Production Considerations

- Set up proper SSL/TLS certificates
- Configure proper environment variables
- Set up monitoring and logging
- Configure backup solutions
- Set up CI/CD pipeline

## Monitoring and Logging

- Docker logs can be viewed using:
  ```bash
  docker-compose logs -f [service-name]
  ```

## Troubleshooting

Common issues and solutions:

1. **Services not starting:**
   ```bash
   docker-compose down
   docker-compose up --build
   ```

2. **Database connection issues:**
   - Check if PostgreSQL and MongoDB containers are running
   - Verify environment variables

3. **Frontend not loading:**
   - Check nginx logs: `docker-compose logs frontend`
   - Verify build process: `cd frontend && npm run build`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request


## Contact

- Developer: Chandan Teekinavar
- GitHub: [chandanteekinavar](https://github.com/chandanteekinavar)
- LinkedIn: [chandanteekinavar](https://www.linkedin.com/in/chandan-teekinavar/)
