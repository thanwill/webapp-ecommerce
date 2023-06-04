// importa o mongoose
const mongoose = require("mongoose");
const filmeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  titulo: { type: String, required: true },
  ano: Number,
  poster: String,
  nota: Number,
  assistido: Boolean,
  comentarios: [
    {
      texto: String,
      autor: String,
    },
  ],
});

const Filme = mongoose.model("Filme", filmeSchema);
module.exports = Filme;
