//File: routers/routers.js
module.exports = function (app) {

  var RouterCollection = require('../models/routers');

  //GET - Return all routers in the DB
  findAllRouters = function (req, res) {
    RouterCollection.find(function (err, routers) {
      if (!err) {
        console.log('GET /routers')
        res.send(routers);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //GET - Return a Router with specified ID
  findById = function (req, res) {
    RouterCollection.findById(req.params.id, function (err, router) {
      if (!err) {
        console.log('GET /router/' + req.params.id);
        res.send(router);
      } else {
        console.log('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new Router in the DB
  addRouter = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var router = new RouterCollection({
      mac: req.body.mac,
      email: req.body.email,
      edad: req.body.edad,
      cp: req.body.cp,
      genero: req.body.genero,
    });

    router.save(function (err) {
      if (!err) {
        console.log('Created');
      } else {
        console.log('ERROR: ' + err);
      }
    });

    res.send(router);
  };

  //PUT - Update a register already exists
  updateRouter = function (req, res) {
    RouterCollection.findById(req.params.id, function (err, router) {
      router.mac = req.body.petId;
      router.email = req.body.email;
      router.edad = req.body.edad;
      router.cp = req.body.cp;
      router.genero = req.body.genero;

      router.save(function (err) {
        if (!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: ' + err);
        }
        res.send(router);
      });
    });
  }

  //DELETE - Delete a Router with specified ID
  deleteRouter = function (req, res) {
    RouterCollection.findById(req.params.id, function (err, router) {
      router.remove(function (err) {
        if (!err) {
          console.log('Removed');
        } else {
          console.log('ERROR: ' + err);
        }
      })
    });
  }

  //Link routers and functions
  app.get('/routers', findAllRouters);
  app.get('/router/:id', findById);
  app.post('/router', addRouter);
  app.put('/router/:id', updateRouter);
  app.delete('/router/:id', deleteRouter);

}
