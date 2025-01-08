#User Login, registration, stock prediction
#we need pandas to read the data and numpy for calculation


from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
import matplotlib.pyplot as plt
from prediction_model import predict_stock
import os
from dotenv import load_dotenv

load_dotenv()
app=Flask(__name__)
CORS(app)
# client=MongoClient('mongodb://localhost:27017/')
# db=client['stock_data']
# users=db['users']
# stock_details=db['stocks']

# @app.route('/register', methods=['POST'])
# def register():
#     data = request.json
#     if users.find_one({"email": data["email"]}):
#         return jsonify({"message": "User already exists"}), 400
#     users.insert_one(data)
#     return jsonify({"message": "User registered successfully"}), 201

# @app.route('/login', methods=['POST'])
# def login():
#     data=request.json
#     user = users.find_one({'email':data['email'], 'password':data['password']})

#     if user:
#         return jsonify({"message":"User Logged In successfully"}), 200
#     return jsonify({"message":"Wrong Credentials"}), 401

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print(f"Request data: {data}")  # Debug log

        if not data or "stock" not in data:
            return jsonify({"error": "Stock name is required"}), 400

        stock_name = data["stock"]
        prediction = predict_stock(stock_name)
        print(f"Prediction: {prediction}")  # Debug

        if "error" in prediction:
            return jsonify({"error": prediction["error"]}), 400

        return jsonify(prediction), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Something went wrong"}), 500




if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=port)