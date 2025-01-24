from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import redis
import os
from dotenv import load_dotenv
import time
import psycopg2

load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Redis configuration
redis_client = redis.Redis.from_url(os.getenv('REDIS_URL'))

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(100))
    image_url = db.Column(db.String(500))

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "up"})

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        # Check cache first
        cached_products = redis_client.get('all_products')
        if cached_products:
            return jsonify(eval(cached_products))
        
        products = Product.query.all()
        result = [{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'stock': p.stock,
            'category': p.category,
            'image_url': p.image_url
        } for p in products]
        
        # Cache the results
        redis_client.setex('all_products', 300, str(result))
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:id>', methods=['GET'])
def get_product(id):
    try:
        product = Product.query.get_or_404(id)
        return jsonify({
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'stock': product.stock,
            'category': product.category,
            'image_url': product.image_url
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            stock=data['stock'],
            category=data['category'],
            image_url=data.get('image_url')
        )
        db.session.add(product)
        db.session.commit()
        
        # Invalidate cache
        redis_client.delete('all_products')
        
        return jsonify({
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': product.price,
            'stock': product.stock,
            'category': product.category,
            'image_url': product.image_url
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def wait_for_db():
    max_retries = 30
    retries = 0
    while retries < max_retries:
        try:
            conn = psycopg2.connect(os.getenv('DATABASE_URL'))
            conn.close()
            return True
        except psycopg2.OperationalError:
            retries += 1
            print(f"Waiting for database... {retries}/{max_retries}")
            time.sleep(2)
    return False

if __name__ == '__main__':
    if wait_for_db():
        with app.app_context():
            db.create_all()
        app.run(host='0.0.0.0', port=int(os.getenv('PORT', 3002)))
    else:
        print("Could not connect to database") 