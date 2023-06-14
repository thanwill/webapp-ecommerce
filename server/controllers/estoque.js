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

  async listar_categorias(req, res) {
    try {
      const categorias = await Categoria.find();

      return res.status(200).json(categorias);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar categorias" });
    }
  }

  async listar_cod(req, res) {
    try {
      const { cod_categoria } = req.params;

      const categoria = await Categoria.findOne({ cod_categoria });

      return res.status(200).json(categoria);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar categoria" });
    }
  }

  // atualizar categoria
  async atualizar(req, res) {
    try {
      const { cod_categoria } = req.params;
      const _id = String((await Categoria.findOne({ cod_categoria }))._id);
      const categoria = req.body;

      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      // await Usuario.findByIdAndUpdate(_id, cliente);

      await Categoria.findByIdAndUpdate(_id, categoria);

      return res.status(200).json({ message: "Categoria atualizada com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao atualizar categoria" });
    }
  }

  // excluir categoria
  async excluir(req, res) {
    try {
      const { cod_categoria } = req.params;
      const _id = String((await Categoria.findOne({ cod_categoria }))._id);
      const categoria = await Categoria.findOne({ cod_categoria });

      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }

      await Categoria.findByIdAndDelete(_id);

      return res.status(200).json({ message: "Categoria excluída com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao excluir categoria" });
    }
  }
}

// cria a classe produto com refereica a categoria
class ProdutoController {
  async criar(req, res) {
    try {
      const { nome, descricao, preco, cod_categoria } = req.body;
      const categoria = await Categoria.findOne({ cod_categoria });
      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      const produto = new Produto({ nome, descricao, preco, categoria });
      await produto.save();
      return res.status(201).json(produto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar produto" });
    }
  }

  async listar_produtos(req, res) {
    try {
      const produtos = await Produto.find();
      return res.status(200).json(produtos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  }

  async listar_cod(req, res) {
    try {
      const { cod_produto } = req.params;
      const produto = await Produto.findOne({ cod_produto });
      return res.status(200).json(produto);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar produto" });
    }
  }

  // atualizar produto
  async atualizar(req, res) {
    try {
      const { cod_produto } = req.params;
      const _id = String((await Produto.findOne({ cod_produto }))._id);
      const produto = req.body;

      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await Produto.findByIdAndUpdate(_id, produto);
      return res.status(200).json({ message: "Produto atualizado com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao atualizar produto" });
    }
  }

  // excluir produto
  async excluir(req, res) {
    try {
      const { cod_produto } = req.params;
      const _id = String((await Produto.findOne({ cod_produto }))._id);
      const produto = await Produto.findOne({ cod_produto });
      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // verifica se o _id é null

      if (_id == null) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await Produto.findByIdAndDelete(_id);
      return res.status(200).json({ message: "Produto excluído com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao excluir produto" });
    }
  }

  async listar_produtos_categoria(req, res) {
    try {
      const { cod_categoria } = req.params;
      const categoria = await Categoria.findOne({ cod_categoria });
      if (!categoria) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      const produtos = await Produto.find({ categoria });
      return res.status(200).json(produtos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  }
}

class DepositoController {
  // código, nome, endereco (referencia)
  async criar(req, res) {
    try {
      const { nome, endereco } = req.body;      
      const deposito = new Deposito({ nome, endereco });
      await deposito.save();
      return res.status(201).json(deposito);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar deposito" });
    }
  }
}

const depositoController = new DepositoController();
const produtoController = new ProdutoController();
const categoriaController = new CategoriaController();
module.exports = {
  categoriaController,
  produtoController,
  depositoController,
};
