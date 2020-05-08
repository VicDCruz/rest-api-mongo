//File: routers/routers.js
// 1 - Colección no pudo ser obtenida
// 2 - Error para encontrar un ID
// 3 - Error al guardar con un registro
// 4 - Error al guardar con varios registros
// 5 - Género no es correcto
// 6 - Llaves no corresponden
// 7 - Error al actualizar
// 8 - Error al eliminar

module.exports = function (app) {

  var RouterCollection = require('../models/routers');
  const fs = require('fs');
  const fields = [
    'noeco', 
    'mac', 
    'email', 
    'edad', 
    'cp', 
    'genero', 
    'urlfoto', 
    'ap1',
    'ap2',
    'nombre',
    'tipo',
    'fase'
  ];

  writeOnFile = text => {
    fs.appendFile('errors.txt', text + '\n', function (err) {
      if (err) {
        console.log('ERROR: ' + err);
      }
    });
  };

  checkKeys = keys => {
    output = true;
    keys.forEach(key => {
      output = output && fields.includes(key);
    });
    return output;
  };

  checkGender = genero => ['hombre', 'mujer', 'femenino', 'masculino', ''].includes(genero);

  //GET - Return all routers in the DB
  findAllRouters = (req, res) => {
    RouterCollection.find(function (err, routers) {
      if (!err) {
        console.log('GET /routers')
        res.send(routers);
      } else {
        console.log('ERROR: ' + err);
        writeOnFile('findAllRouters,1,');
        res.status(404).send('Error 1');
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
        writeOnFile('findById,2,' + req.params.id);
        res.status(404).send('ERROR: 2');
      }
    });
  };

  //POST - Insert a new Router in the DB
  addRouter = (req, res) => {
    console.log('POST');
    console.log(req.body);

    if (checkKeys(Object.keys(req.body))) {
      if (checkGender(req.body.genero)) {
        var router = new RouterCollection({
          noeco: req.body.noeco,
          mac: req.body.mac,
          email: req.body.email,
          edad: req.body.edad,
          cp: req.body.cp,
          genero: req.body.genero,
          urlfoto: req.body.urlfoto,
          ap1: req.body.ap1,
          ap2: req.body.ap2,
          nombre: req.body.nombre,
          tipo: req.body.tipo,
          fase: req.body.fase
        });

        router.save(err => {
          if (!err) {
            console.log('Created');
          } else {
            console.log('ERROR: ' + err);
            writeOnFile('addRouter,3,' + JSON.stringify(req.body));
            res.status(404).send('ERROR: 3');
          }
        });
      } else {
        console.log('ERROR: Gender is not correct');
        writeOnFile('addRouter,5,' + JSON.stringify(req.body));
        res.status(404).send('Error 5');
      }
    } else {
      console.log('ERROR: Keys not corresponding');
      writeOnFile('addRouter,6,' + JSON.stringify(req.body));
      res.status(404).send('Error: 6');
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
      if (checkKeys(Object.keys(req.body))) {
        if (checkGender(element.genero)) {
          router = new RouterCollection({
            noeco: element.noeco,
            mac: element.mac,
            email: element.email,
            edad: element.edad,
            cp: element.cp,
            genero: element.genero,
            urlfoto: element.urlfoto,
            ap1: element.ap1,
            ap2: element.ap2,
            nombre: element.nombre,
            tipo: element.tipo,
            fase: element.fase
          });

          router.save(err => {
            if (!err) {
              console.log('Created ' + i + ' of ' + req.body.length);
            } else {
              console.log('ERROR: ' + err);
              writeOnFile('addManyRouters,7,' + element);
              res.status(404).send('Error 4');
            }
          });

          routers.push(router);
        } else {
          console.log('ERROR: Gender is not correct');
          writeOnFile('addRouter,5,' + JSON.stringify(req.body));
          res.status(404).send('Error: 5');
        }
      } else {
        console.log('ERROR: Keys not corresponding');
        writeOnFile('addRouter,6,' + element);
        res.status(404).send('Error: 6');
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
      router.urlfoto = req.body.urlfoto;
      router.ap1 = req.body.ap1;
      router.ap2 = req.body.ap2;
      router.nombre = req.body.nombre;
      router.tipo = req.body.tipo;
      router.fase = req.body.fase;

      router.save(err => {
        if (!err) {
          console.log('Updated');
        } else {
          console.log('ERROR: ' + err);
          writeOnFile('updateRouter,7,' + JSON.stringify(req.body));
          res.status(500).send('Error: 7');
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
          writeOnFile('deleteRouter,8,' + JSON.stringify(req.body));
          res.status(500).send('Error: 8');
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
