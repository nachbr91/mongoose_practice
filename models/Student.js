// Importo mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creo Schema:
const studentSchema = new Schema({
  name: {type: String, required: true}, // Añadimos 'required: true' para que sea obligatorio indicarlo
  lastName: {type: String, required: true},
  age: {type: Number, required: true},
  grades: {type: Array},
  class: {type: String, enum: ['A', 'B']},
  pendingBills: {type: Boolean, default: false},
  idioma: {type: String, enum: ['ingles', 'español', 'NA']}
}, {versionKey: false, timestamps: true});

//Exporto modelo a mongoose
module.exports = mongoose.model('Student', studentSchema);