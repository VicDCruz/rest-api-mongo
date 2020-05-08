import pymongo

conecction = pymongo.MongoClient("mongodb://localhost:27017/")
db = conecction["routers"]
collection = db["routers"]

query = { }

results = collection.find(query)

for x in results:
  print(x)