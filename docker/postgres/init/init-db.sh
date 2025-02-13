#!/bin/bash

set -e

# Wait for PostgreSQL to be ready
until pg_isready -U postgres; do
  echo "Waiting for PostgreSQL to be ready..."
  sleep 2
done

# Create databases
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<EOSQL
DROP DATABASE IF EXISTS shopsmart_products;
DROP DATABASE IF EXISTS shopsmart_orders;

CREATE DATABASE shopsmart_products;
CREATE DATABASE shopsmart_orders;
EOSQL

# Initialize products database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "shopsmart_products" <<EOSQL
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    stock INTEGER NOT NULL,
    category VARCHAR(100),
    image_url VARCHAR(500)
);
EOSQL

# Initialize orders database
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "shopsmart_orders" <<EOSQL
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
EOSQL 