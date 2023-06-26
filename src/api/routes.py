from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Message
from api.utils import generate_sitemap, APIException, is_valid_email, is_valid_password, set_password, check_password, generate_salt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def add_user():
    if not request.is_json:
        return jsonify({'message': 'Body must be a valid json item'}), 400

    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)

    if None in [email, password]:
        return jsonify({'message': 'Wrong properties'}), 400
    if not is_valid_password(password):
        return jsonify({'message': 'Invalid password'}), 400
    if not is_valid_email(email):
        return jsonify({'message': 'Invalid email'}), 400

    salt = generate_salt()
    password = set_password(password, salt)
    user = User(email=email, password=password, salt=salt)

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User created'}), 201
    except Exception as exception:
        db.session.rollback()
        return jsonify({'message': f'Error {exception.args}'}), 500


@api.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({'message': 'Body must be a valid json item'}), 400

    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)

    if None in [email, password]:
        return jsonify({'message': 'Wrong json item'}), 400
    
    user = User.query.filter_by(email=email).one_or_none()

    if user is None:
        return jsonify({'message': 'Wrong password or email'}), 400
    
    user_password = user.password
    user_salt = user.salt
    if not check_password(user_password, f'{password}{user_salt}'):
        return jsonify({'message': 'Wrong password or email'}), 400

    token = create_access_token(identity=user.id)

    return jsonify({'token': token}), 200


@api.route('/post', methods=['GET'])
@jwt_required()
def get_all_post():
    posts = Post.query.all()

    posts = list(map( lambda item: item.serialize(), posts ))

    return jsonify(posts), 200

@api.route('/post/<int:post_id>/messages', methods=['GET'])
@jwt_required()
def get_all_messages_from_post(post_id):
    post = Post.query.get(post_id)

    if post is None:
        return {'message': 'Not found'}, 404
    
    messages = list(map(lambda item: item.serialize(), post.message))

    return jsonify(messages), 200


@api.route('/post', methods=['POST'])
@jwt_required()
def create_post():
    if not request.is_json:
        return jsonify({'message': 'Body must be a valid json item'}), 400

    body = request.json
    title = body.get('title', None)
    description = body.get('description', None)

    if None in [title, description]:
        return jsonify({'message': 'Wrong properties'}), 400

    user_id = get_jwt_identity()

    post = Post(user_id=user_id, title=title, description=description)
    db.session.add(post)

    try:
        db.session.commit()
        return jsonify(post.serialize()), 201
    except exception:
        db.session.rollback()
        return jsonify({'message': 'Some error ocurried, try again'}), 200