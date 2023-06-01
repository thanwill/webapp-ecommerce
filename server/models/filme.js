// importa o mongoose
const mongoose = require('mongoose');
const filmeSchema = new mongoose.Schema({
  /* cria um ID unico para cada filme
    id: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    diretor: String,
    ano: Number,
    comentarios: [
      {
        texto: String,
        autor: String
      }
      {
      "id": 85,
      "titulo": "The Avengers",
      "ano": 2012,
      "poster": "https://upload.wikimedia.org/wikipedia/pt/6/69/The_Avengers_Cartaz.jpg?20120429164328",
      "nota": 4.9,
      "assistido": true
    }
    ]*/

    id: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true },
    ano: Number,
    poster: String,
    nota: Number,
    assistido: Boolean,
    comentarios: [
      {
        texto: String,
        autor: String
      }
    ]
    
  });
  
  const Filme = mongoose.model('Filme', filmeSchema);
  module.exports = Filme;  