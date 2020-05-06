//File: routers/routers.js
module.exports = function (app) {

  var RouterCollection = require('../models/routers');
  const fs = require('fs');
  const fields = ['mac', 'email', 'edad', 'cp', 'genero'];

  writeOnFile = text => {
    fs.appendFile('errors.txt', text + '\n', function (err) {
      if (err) {
        console.log('ERROR: ' + err);
        res.status(505).send('Internal server error');
      };
    });
  };

  check = keys => {
    output = true;
    keys.forEach(key => {
      output = output && fields.includes(key);
    });
    return output;
  };

  //GET - Return all routers in the DB
  findAllRouters = (req, res) => {
    RouterCollection.find(function (err, routers) {
      if (!err) {
        console.log('GET /routers')
        res.send(routers);
      } else {
        console.log('ERROR: ' + err);
        writeOnFile('findAllRouters,' + err + ',');
        res.status(404).send('Collection could not be returned');
      }
    });
  };

  //GET - Return a Router with specified ID
  findById = (req, res) => {
    RouterCollection.findById(req.params.id, (err, router) => {
      if (!err) {
        console.log('GET /router/' + req.params.id);
        res.send(router);
      } else {
        console.log('ERROR: ' + err);
        writeOnFile('findById,' + err + ',' + req.params.id);
        res.status(404).send('ERROR: ' + err);
      }
    });
  };

  //POST - Insert a new Router in the DB
  addRouter = (req, res) => {
    console.log('POST');
    console.log(req.body);

    if (check(Object.keys(req.body))) {
      var router = new RouterCollection({
        mac: req.body.mac,
        email: req.body.email,
        edad: req.body.edad,
        cp: req.body.cp,
        genero: req.body.genero,
      });

      router.save(err => {
        if (!err) {
          console.log('Created');
        } else {
          console.log('ERROR: ' + err);
          writeOnFile('addRouter,' + err + ',' + req.body);
          res.status(404).send('ERROR: ' + err);
        }
      });
    } else {
      console.log('ERROR: Keys not corresponding');
      writeOnFile('addRouter,Keys not corresponding,' + req.body);
      res.status(404).send('ERROR: Keys not corresponding');
    }

    res.send(router);
  };

  //POST - Insert a new Router in the DB
  addManyRouters = (req, res) => {
    console.log('POST');
    console.log('Many (length): ' + req.body.length);

    var router;
    var routers = [];
    var i = 1;

    req.body.forEach(element => {
      if (check(Object.keys(req.body))) {
        router = new RouterCollection({
          mac: element.mac,
          email: element.email,
          edad: element.edad,
          cp: element.cp,
          genero: element.genero,
        });

        router.save(err => {
          if (!err) {
            console.log('Created ' + i + ' of ' + req.body.length);
          } else {
            console.log('ERROR: ' + err);
            writeOnFile('addManyRouters,' + err + ',' + element);
            res.status(404).send('Can not follow processing\nERROR: ' + err);
          }
        });

        routers.push(router);
      } else {
        console.log('ERROR: Keys not corresponding');
        writeOnFile('addRouter,Keys not corresponding,' + element);
        res.status(404).send('ERROR: Keys not corresponding');
      }
      i++;
    });

    res.send(routers);
  };

  //PUT - Update a register already exists
  updateRouter = (req, res) => {
    RouterCollection.findById(req.params.id, (_, router) => {
      router.mac = req.body.mac;
      router.email = req.body.email;
      router.edad = req.body.edad;
      router.cp = req.body.cp;
      router.genero = req.body.genero;

      router.save(err => {
        if (!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: ' + err);
          writeOnFile('updateRouter,' + err + ',' + req.body);
          res.status(500).send('ERROR: ' + err);
        }
        res.send(router);
      });
    });
  }

  //DELETE - Delete a Router with specified ID
  deleteRouter = (req, res) => {
    RouterCollection.findById(req.params.id, (_, router) => {
      router.remove(err => {
        if (!err) {
          console.log('Removed');
        } else {
          console.log('ERROR: ' + err);
          writeOnFile('deleteRouter,' + err + ',' + req.body);
          res.status(500).send('ERROR: ' + err);
        }
      })
    });
  }

  //Link routers and functions
  app.get('/routers', findAllRouters);
  app.get('/router/:id', findById);
  app.post('/router', addRouter);
  app.post('/routers', addManyRouters);
  app.put('/router/:id', updateRouter);
  app.delete('/router/:id', deleteRouter);

}
