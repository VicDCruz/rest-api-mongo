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

sql = "TRUNCATE TABLE routers"
sqlcursor.execute(sql)
sqlConnection.commit()

for x in results:
    if "noeco" not in x:
        x.update(noeco = "sin eco")
    if "email" not in x:
        x.update(email = "sin email")
    if "edad" not in x:
        x.update(edad = "sin edad")
    sql = "INSERT INTO routers (noeco, mac, email, edad, cp, genero) VALUES (%s, %s, %s, %s, %s, %s)"
    val = (x['noeco'], x['mac'], x['email'], x['edad'], x['cp'], x['genero'])
    sqlcursor.execute(sql, val)
    sqlConnection.commit()
    print(sqlcursor.rowcount, "record inserted.")
