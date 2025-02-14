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

## Technical Architecture

### Microservices Overview

The application is built using a microservices architecture with the following services:

#### 1. Frontend Service (Port: 80)
- **Technology**: React, TypeScript, Material-UI
- **Purpose**: Serves the user interface
- **Key Features**:
  - Server-side rendered React application
  - Redux for state management
  - Material-UI components
  - Responsive design
- **Dependencies**: Communicates with all backend services through REST APIs
- **Container**: Nginx for static file serving

#### 2. User Service (Port: 3001)
- **Technology**: Node.js, Express, MongoDB
- **Purpose**: Handles user authentication and profile management
- **Key Features**:
  - User registration and login
  - JWT authentication
  - Profile management
  - Password reset functionality
- **Database**: MongoDB
- **Dependencies**: None (Independent service)
- **APIs**:
  - POST /api/auth/login
  - POST /api/auth/register
  - GET /api/users/profile
  - PUT /api/users/profile

#### 3. Product Service (Port: 3002)
- **Technology**: Node.js, Express, PostgreSQL
- **Purpose**: Manages product catalog and inventory
- **Key Features**:
  - Product CRUD operations
  - Category management
  - Search and filtering
  - Inventory tracking
- **Database**: PostgreSQL
- **Dependencies**: None (Independent service)
- **APIs**:
  - GET /api/products
  - GET /api/products/:id
  - GET /api/products/category/:category

#### 4. Order Service (Port: 3003)
- **Technology**: Node.js, Express, PostgreSQL
- **Purpose**: Handles order processing and management
- **Key Features**:
  - Order creation and management
  - Order status tracking
  - Order history
- **Database**: PostgreSQL
- **Dependencies**:
  - Product Service (for inventory updates)
  - Payment Service (for payment processing)
  - Notification Service (for order updates)
- **APIs**:
  - POST /api/orders
  - GET /api/orders/:id
  - GET /api/orders/user/:userId

#### 5. Payment Service (Port: 3004)
- **Technology**: Node.js, Express
- **Purpose**: Handles payment processing
- **Key Features**:
  - Cash on Delivery processing
  - Payment status tracking
  - Mock payment integration
- **Database**: PostgreSQL
- **Dependencies**:
  - Order Service (for order updates)
  - Notification Service (for payment confirmations)
- **APIs**:
  - POST /api/payments
  - GET /api/payments/:id

#### 6. Notification Service (Port: 3005)
- **Technology**: Node.js, Express, RabbitMQ
- **Purpose**: Manages all system notifications
- **Key Features**:
  - Email notifications
  - Order status updates
  - Payment confirmations
- **Message Broker**: RabbitMQ
- **Dependencies**: Consumes events from all services
- **APIs**:
  - POST /api/notifications/email

### Service Communication

```
                                   ┌─────────────────┐
                                   │                 │
                                   │    Frontend     │
                                   │    (Port 80)    │
                                   │                 │
                                   └────────┬────────┘
                                           │
                                           ▼
                     ┌────────────────────────────────────────┐
                     │           Nginx Reverse Proxy          │
                     └────────────────────────────────────────┘
                                           │
                     ┌────────────────────────────────────────┐
                     ▼                     ▼                   ▼
              ┌──────────────┐    ┌───────────────┐    ┌────────────┐
              │              │    │               │    │            │
              │ User Service │    │Product Service│    │Order Service│
              │  (Port 3001) │    │ (Port 3002)  │    │(Port 3003) │
              │              │    │               │    │            │
              └──────┬───────┘    └───────┬───────┘    └─────┬──────┘
                     │                    │                   │
                     │                    │                   │
              ┌──────▼────────────────────▼───────────────────▼──────┐
              │                     Message Bus                       │
              │                     (RabbitMQ)                       │
              └──────▲────────────────────▲───────────────────▲──────┘
                     │                    │                   │
              ┌──────┴───────┐    ┌──────┴───────┐   ┌──────┴───────┐
              │              │    │              │   │              │
              │Payment Service│    │Notification  │   │  Database    │
              │ (Port 3004)  │    │   Service    │   │  Services    │
              │              │    │ (Port 3005)  │   │              │
              └──────────────┘    └──────────────┘   └──────────────┘
```

### Data Flow

1. **User Authentication Flow**:
   - Frontend → User Service: Authentication request
   - User Service → MongoDB: Verify credentials
   - User Service → Frontend: JWT token
   - Frontend: Stores token in localStorage

2. **Product Browsing Flow**:
   - Frontend → Product Service: Product list request
   - Product Service → PostgreSQL: Fetch products
   - Product Service → Frontend: Product data
   - Frontend: Renders product list

3. **Order Processing Flow**:
   - Frontend → Order Service: Create order request
   - Order Service → Product Service: Check inventory
   - Order Service → Payment Service: Process payment
   - Payment Service → Order Service: Payment confirmation
   - Order Service → Notification Service: Order confirmation
   - Notification Service → RabbitMQ: Email notification

### Database Schema

#### MongoDB (User Service)
```javascript
User {
  _id: ObjectId,
  email: String,
  password: String (hashed),
  firstName: String,
  lastName: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

#### PostgreSQL (Product Service)
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10,2),
  stock INTEGER,
  category VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

#### PostgreSQL (Order Service)
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  total_amount DECIMAL(10,2),
  status VARCHAR(50),
  shipping_address JSONB,
  payment_status VARCHAR(50),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  price DECIMAL(10,2)
);
```

### Infrastructure

#### Docker Configuration
- Each service has its own Dockerfile
- Services are orchestrated using docker-compose
- Shared network for inter-service communication
- Volume mounts for persistent data

#### Nginx Configuration
- Serves as reverse proxy
- Routes requests to appropriate services
- Handles SSL termination
- Serves static frontend files

#### Message Queue
- RabbitMQ for asynchronous communication
- Used for:
  - Order notifications
  - Inventory updates
  - Email notifications

### Security Measures

1. **Authentication**:
   - JWT-based authentication
   - Token expiration
   - Secure password hashing

2. **API Security**:
   - CORS configuration
   - Rate limiting
   - Request validation

3. **Data Security**:
   - Encrypted database connections
   - Secure environment variables
   - Input sanitization
