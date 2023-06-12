const mongoose = require("mongoose");
const pagamentoSchema = new mongoose.Schema({
    // codigo, valor, data, forma de pagamento, status, pedido
    codigo: { type: Number, required: true, unique: true },
    valor: { type: Number, required: true },
    data: { type: Date, required: true },
    formaPagamento: { type: String, required: true },
    status: { type: String, required: true },
    pedido: { type: mongoose.Schema.Types.ObjectId, ref: "Pedido" },
});
const Pagamento = mongoose.model("Pagamento", pagamentoSchema);
module.exports = Pagamento;
