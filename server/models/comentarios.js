const mongoose = require("mongoose");
const comentarioSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  texto: { type: String, required: true },
  nota: { type: Number, required: true, min: 1, max: 5 },
});
const Comentario = mongoose.model("Comentario", comentarioSchema);
module.exports = Comentario;
