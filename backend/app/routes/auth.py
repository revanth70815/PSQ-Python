from flask import Blueprint, request, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from app import db, bcrypt
from app.models import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.post('/register')
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 400
    hashed = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(name=data['name'], email=data['email'], password=hashed, role=data.get('role', 'nominee'))
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return jsonify(user.to_dict()), 201


@auth_bp.post('/login')
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    login_user(user, remember=data.get('remember', False))
    return jsonify(user.to_dict())


@auth_bp.post('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'})


@auth_bp.get('/me')
@login_required
def me():
    return jsonify(current_user.to_dict())
