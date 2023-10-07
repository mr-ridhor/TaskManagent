from flask import Flask
from models import db
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

import os
app = Flask(__name__)
CORS(app)
load_dotenv()
# Configure CORS to allow requests from your React app's origin
# Configure the app with your environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config ['SECRET_KEY'] = os.getenv('SECRET_KEY')
# app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


db.init_app(app)
with app.app_context():
    db.create_all()

@app.get("/")
def home():
    return "Hello..."

from routes import  signup, login

# if __name__ == '__main__':
#     app.run()