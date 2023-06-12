const mongoose = require('mongoose');
const pedidoSchema = new mongoose.Schema({
// código, preço total, lista de produtos com quantidade (precisa de relacionamento), cliente (com relacionamento), data e hora do pedido, status do pedido.
codigo: { type: Number, required: true, unique: true },
precoTotal: { type: Number, required: true },
produtos: [
    {
        produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto" },
        quantidade: { type: Number, required: true },
    },
],
cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
dataHora: { type: Date, required: true },
status: { type: String, required: true },
});
const Pedido = mongoose.model("Pedido", pedidoSchema);
module.exports = Pedido;
