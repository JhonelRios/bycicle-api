const mongoose = require('mongoose');

const bicycleSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: [true, 'marca is required']
  },
  aro: {
    type: Number,
    required: [true, 'aro is required']
  },
  nombre: {
    type: String,
    required: [true, 'nombre is required']
  },
  tipo: {
    type: String,
    required: [true, 'tipo is required']
  },
  imagenURL: {
    type: String,
    required: [true, 'imagenURL is required']
  },
  especificaciones: {
    type: [String],
    required: [true, 'especificaciones is required']
  }
});

module.exports = mongoose.model('bicycles', bicycleSchema);