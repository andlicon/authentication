from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException, is_valid_email, is_valid_password, set_password, check_password, generate_salt

api = Blueprint('api', __name__)

@api.route('/login', methods=['POST'])
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
        print('aaa')
        db.session.commit()
        return jsonify({'message': 'User created'}), 200
    except Exception as exception:
        db.session.rollback()
        return jsonify({'message': f'Error {exception.args}'}), 500