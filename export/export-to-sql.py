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
    noeco = "sin noeco"
    mac = "sin mac"
    email = "sin email"
    edad = "sin edad"
    cp = "sin cp"
    genero = "sin genero"
    if "noeco" in x:
      noeco = x.noeco
    if "mac" in x:
      mac = x.mac
    if "email" in x:
      email = x.email
    if "edad" in x:
      edad = x.edad
    if "cp" in x:
      cp = x.cp
    if "genero" in x:
      genero = x.genero
    val = (noeco, mac, email, edad, cp, genero)
    sqlcursor.execute(sql, val)
    sqlConnection.commit()
    print(sqlcursor.rowcount, "record inserted.")