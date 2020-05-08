import pymongo
import mysql.connector

mongoConnection = pymongo.MongoClient("mongodb://localhost:27017/")
db = mongoConnection["routers"]
collection = db["routers"]

sqlConnection = mysql.connector.connect(
  host="localhost",
  user="baz",
  passwd="Baz1nd1c4!",
  database="routers"
)
sqlcursor = sqlConnection.cursor()

query = {}

results = collection.find(query)

for x in results:
    sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
    val = ("John", "Highway 21")
    sqlcursor.execute(sql, val)
    sqlConnection.commit()
    print(sqlcursor.rowcount, "record inserted.")