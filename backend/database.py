from pymongo import MongoClient

# MongoDB connection
def get_db():
    client = MongoClient("mongodb://localhost:27017/")
    db = client.stockApp  # Database name
    return db
