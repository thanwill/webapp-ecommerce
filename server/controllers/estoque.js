const { Categoria, Produto, Deposito, Movimento } = require("../models/estoque");

class CategoriaController {
  async criar(req, res) {
    try {
      const { nome, descricao } = req.body;

      const categoria = new Categoria({ nome, descricao });

      await categoria.save();

      return res.status(201).json(categoria);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar categoria" });
    }
  }
}

module.exports = {
    CategoriaController
};
