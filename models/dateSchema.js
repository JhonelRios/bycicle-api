const mongoose = require('mongoose');

const dateSchema = new mongoose.Schema({
  especialidad: {
    type: String,
    required: [true, 'especialidad is required']
  },
  alergia: {
    type: String
  },
  medicamento: {
    type: String
  },
  email: {
    type: Boolean,
  },
  sintomas: {
    type: [String],
    required: [true, 'sintomas is required']
  },
  user: {
    type: String,
    required: [true, 'user is required']
  },
  time: {
    type: Boolean,  
  },
  realizado: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Dates', dateSchema);