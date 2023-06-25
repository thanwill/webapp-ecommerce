const mongoose = require("mongoose");
const valida = require("./valida");

const enderecoSchema = new mongoose.Schema({
  // rua, numero, complemento, bairro, cidade, estado, cep
  cod_endereco: {
    type: String,
    required: true,
    unique: true,
    default: function () {
      return valida.gerarCodigo("END");
    },
  },
  rua: { type: String, required: true },
  numero: { type: Number, required: true },
  bairro: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  cep: { type: String, required: true },
  complemento: { type: String },
  dataCriacao: { type: Date, defaul: Date.now },
  dataAtualizacao: { type: Date, defaul: Date.now },
});

// usa o pre para limpar a string de CEP antes de salvar como numero de 8 digitos
enderecoSchema.pre("save", async function (next) {
  this.cep = this.cep.replace(/\D/g, "");

  const endereco = await mongoose.model("Endereco", enderecoSchema).findOne({ cod_endereco: this.cod_endereco });
  if (endereco) {
    return next(new Error("Código de endereço já existe"));
  }

  next();
});

module.exports = mongoose.model("Endereco", enderecoSchema);
