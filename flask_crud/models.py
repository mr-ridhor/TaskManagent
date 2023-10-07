from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date
from datetime import date
from datetime import datetime
db = SQLAlchemy()



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(280), nullable=False)
    created_at =db.Column(db.DateTime)   

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "username": self.username,
           
        }

    def __init__(self, username, email, password,name):
        self.name=name
        self.username = username
        self.email = email
        self.password = password
        self.created_at = datetime.utcnow()


    


# Define the Item model (for CRUD)
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    tags=db.Column(db.String(200), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    levels=db.Column(db.String(20), nullable=False)
    due_date = db.Column(db.Date) 
    created_at =db.Column(Date, default=date.today)
    updated_at =db.Column(Date, default=date.today) 


    
    

    def __init__(self, title, description, user_id, due_date, levels,tags,):
        self.title = title
        self.description = description
        self.user_id = user_id
        self.due_date = due_date
        self.levels = levels
        self.tags=tags
        self.created_at = datetime.utcnow()
    
    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'tags': self.tags,
            'user_id': self.user_id,
            'levels': self.levels,
            'due_date': str(self.due_date) if self.due_date else None,
            'created_at': str(self.created_at),
            'updated_at': str(self.updated_at),
        }


  