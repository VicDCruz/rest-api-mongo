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
    sql = "INSERT INTO routers (noeco, mac, email, edad, cp, genero) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (x['noeco'], x['mac'], x['email'], x['edad'], x['cp'], x['genero'])
    sqlcursor.execute(sql, val)
    sqlConnection.commit()
    print(sqlcursor.rowcount, "record inserted.")
