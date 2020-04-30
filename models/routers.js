var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var routerSchema = new Schema({
  mac: { type: String },
  email: { type: String },
  edad: { type: Number },
  cp: { type: String },
  genero: {
    type: String, enum:
      ['hombre', 'mujer']
  },
});


module.exports = mongoose.model('Router', routerSchema);