var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
// app.use(app.router);

app.get('/', function (req, res) {
  res.send("Hello world!");
});

routes = require('./routes/routers')(app);

mongoose.connect('mongodb://localhost/routers', {
  useNewUrlParser: true ,
  useUnifiedTopology: true
}, function (err, res) {
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

server.listen(9090, function () {
  console.log("Node server running on http://localhost:9090");
});
