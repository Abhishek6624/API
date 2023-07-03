from Flask import Flask, request, jsonify
import re

app = Flask(__name__)

# In-memory user database
users = [
    {'username': 'user1', 'password': 'password1'},
    {'username': 'user2', 'password': 'password2'}
]

# Regular expressions for username and password validation
username_regex = re.compile(r'^[a-zA-Z0-9]{6,12}$')
password_regex = re.compile(r'^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};'"|,.<>/?]{6,}$")

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    # Validate username and password
    if not username_regex.match(username) or not password_regex.match(password):
        return jsonify({'error': 'Invalid username or password'}), 400

    # Check if the provided username and password match a user in the database
    user = next((user for user in users if user['username'] == username and user['password'] == password), None)

    if user:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

# Start the server
if __name__ == '__main__':
    app.run()
