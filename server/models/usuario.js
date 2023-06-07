const mongoose = require('mongoose');
const usuarioSchema = new mongoose.Schema({
    id: Number,
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: String,
    foto: Buffer,
    newsletter : Boolean,
    plano : Number,
});
const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;


