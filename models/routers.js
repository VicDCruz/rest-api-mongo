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
}, { timestamps: { createdAt: 'created_at' } });


module.exports = mongoose.model('Router', routerSchema);