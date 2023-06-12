const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    id: Number,
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: String,
    foto: {
        imagem: Buffer,
        contentType: String
    },
    newsletter : Boolean,
    plano : Number,
    dataCriacao: { type: Date, default: Date.now },
    dataAtualizacao: { type: Date, default: Date.now }
});
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;


