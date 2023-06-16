const mongoose = require("mongoose");
const valida = require("./valida");

const comentarioSchema = new mongoose.Schema({
  cod_comentario: 
  {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("COM");
    }
  },
  texto: { type: String, required: true },
  nota: { type: Number, required: true, min: 1, max: 5 },
});
const Comentario = mongoose.model("Comentario", comentarioSchema);
module.exports = Comentario;
