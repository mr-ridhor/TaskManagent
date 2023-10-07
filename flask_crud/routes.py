from flask import Flask, request, jsonify
from app import app, db
from models import User,Item
from flask_jwt_extended import jwt_required, get_jwt_identity,create_access_token,JWTManager

from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS, cross_origin


CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5173"}})
@app.post('/auth/signup')
def signup():
    data = request.get_json()
    name=data.get('name')
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not username or not password or not name or not email:
        return jsonify({"error": "All fields are required"}), 400


    existing_user = User.query.filter_by(username=username).first()
    existing_email = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"error": "Username already exists"}), 400
    if existing_email:
        return jsonify({"error": "Email already exists"}), 400
    
    # Hash the password
    hashed_password = generate_password_hash(password)
  

    user = User(username=username, password=hashed_password,name=name, email=email)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

jwt = JWTManager(app)
# User profile route
@app.route('/user', methods=['GET'])
@jwt_required()
def profile():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user_data = user.serialize()
    return jsonify({"user": user_data}), 200

#Login
@app.post('/auth/login')
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "Invalid username "}), 401
    
     
    if not check_password_hash(user.password, password):
        x=check_password_hash(user.password, password)
        print(password)
        return jsonify({"message": "Invalid password","lol":user.password}), 401
  
    access_token = create_access_token(identity=user.id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    
    user_data = user.serialize()
    
    return jsonify({"message": "Login successful","access_token": access_token,"user": user_data}), 200




@app.route('/items', methods=['POST'])
@jwt_required()
def create_item():
    data = request.get_json()
    title = data.get('title')
    tags=data.get('tags')
    due_date=data.get('due_date')
    levels=data.get('levels')
    description = data.get('description')
    current_user_id = get_jwt_identity()


    if not title or not tags or not due_date or not levels or not description:
        return jsonify({"message": "Item name is required"}), 400
    # Create a new item
    item = Item(title=title, description=description,due_date=due_date,
                    tags=tags,levels=levels,user_id=current_user_id)

    # Add the item to the database
    db.session.add(item)
    db.session.commit()
    items = {
        'id': item.id,
        'title': item.title,
        'description': item.description,
        'due_date': item.due_date.strftime('%Y,%m,%d'),  # Convert to string in the desired format
        'tags': item.tags,
        'levels': item.levels,
        'user_id': item.user_id
    }


    return jsonify({'message': 'Item created successfully',"items":items}),201



#Get all items
@app.route('/items', methods=['GET'])
@jwt_required()
def get_items():
    current_user_id = get_jwt_identity()
    items = Item.query.filter_by(user_id=current_user_id).all()
  
    serialized_items = []

    for item in items:
        user = User.query.get(item.user_id)
        serialized_item = item.serialize()
    
        user_data = {
            'user_id': user.id,
            'user_name': user.name,
            'user_email':user.email
        }
        serialized_item['user'] = user_data
        serialized_items.append(serialized_item)

    return jsonify({"lists_data":serialized_items}), 200


# Get item by id
@app.route("/items/<int:item_id>", methods=["GET"])
@jwt_required()
def get_item(item_id):
    current_user = get_jwt_identity()
    
    # Retrieve the item by ID for the authenticated user
    item = Item.query.filter_by(id=item_id, user_id=current_user).first()

    if not item:
        return jsonify({"message": "Item not found"}), 404

  

    user = User.query.get(item.user_id)

    # Serialize the item to a dictionary
    serialized_item = {
        'id': item.id,
        'title': item.title,
        'description': item.description,
        'due_date': item.due_date.strftime('%Y-%m-%d'),  # Convert to string in the desired format
        'tags': item.tags,
        'levels': item.levels,
        'user_id': item.user_id,
    }

    # Include the user's username in a separate dictionary
    user_info = {
        'user_id': user.id,
        'username': user.username
    }

  
    serialized_item['user'] = user_info

    # Return the serialized item as JSON
    return jsonify(serialized_item), 200

@app.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    data = request.get_json()
    item.title = data.get('title', item.title)
    item.description = data.get('description', item.description)
    item.due_date = data.get('due_date', item.due_date)
    item.tags = data.get('tags', item.tags)
    item.levels = data.get('levels', item.levels)
    
    db.session.commit()

    return jsonify({"message": "Item updated successfully"}), 200

# Delete item route
@app.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404

    db.session.delete(item)
    db.session.commit()

    return jsonify({"message": "Item deleted successfully"}), 200

