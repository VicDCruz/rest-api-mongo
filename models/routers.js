var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var routerSchema = new Schema({
  noeco: { type: String },
  mac: { type: String },
  email: { type: String },
  edad: { type: String },
  cp: { type: String },
  genero: {
    type: String, enum:
      ['hombre', 'mujer', 'femenino', 'masculino', '']
  },
  urlfoto: { type: String },
  ap1: { type: String },
  ap2: { type: String },
  nombre: { type: String },
  tipo: { type: String },
  fase: { type: String },
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Router', routerSchema);