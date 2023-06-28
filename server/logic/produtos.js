const { Categoria, Produto, Deposito, ItemMovimento } = require("../models/estoque");

class ProdutosLogic {
  // retorna o valor do produto em itens, o nome da categoria e informacoes de produtos
  async listar() {
    const produtos = await Produto.findAll({
      include: [
        {
          model: Categoria,
          as: "categoria",
          attributes: ["nome"],
        },
        {
          model: Deposito,
          as: "deposito",
          attributes: ["nome"],
        },
        {
          model: ItemMovimento,
          as: "itemMovimento",
          Attributes: ["valor_unitario", "quantidade"],
        },
      ],
    });

    return produtos;
  }
}

//module.exports = new UsuarioController();
module.exports = new ProdutosLogic();
