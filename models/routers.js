var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var routerSchema = new Schema({
  mac: { type: String },
  email: { type: String },
  edad: { type: String },
  cp: { type: String },
  genero: {
    type: String, enum:
      ['hombre', 'mujer', 'femenino', 'masculino']
  },
});


module.exports = mongoose.model('Router', routerSchema);