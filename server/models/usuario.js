const mongoose = require("mongoose");
const valida = require("./valida");
const bcryptjs = require("bcryptjs");
//código, foto de perfil, nome completo, endereço, telefone, CPF, cartão de crédito (Nome, Número e CVC), email e senha.

const usuarioSchema = new mongoose.Schema({
  cod_usuario: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("USU");
    },
  },

  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true, select: false },
  notificacoes: { type: Boolean, required: false },
  telefone: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  // foto do multer
  foto: { data: Buffer, contentType: String },
  plano: { type: Number, required: true, default: 1 },
  token: { type: String, select: false },
  // adiciona os daos do cartao
  cartao: {
    nome: String,
    numero: String,
    cvc: String,
  },
  // endereco da model endereco
  endereco: { type: mongoose.Schema.Types.ObjectId, ref: "Endereco", required: false },
  dataCriacao: { type: Date, default: Date.now, required: true, defaul: Date.now },
  dataAtualizacao: { type: Date, default: Date.now, required: true, defaul: Date.now },
});

// criptografar a senha antes de salvar
usuarioSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
});

module.exports = mongoose.model("Usuario", usuarioSchema);
