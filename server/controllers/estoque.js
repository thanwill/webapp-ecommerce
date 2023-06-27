const { Categoria, Produto, Deposito, Movimento, ItemMovimento } = require("../models/estoque");
const Endereco = require("../models/endereco");

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
      const categoria = await Categoria.findOne({ cod_categoria: cod_categoria });

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

  async criarOld(req, res) {
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
      const produto = await Produto.findOne({ cod_produto }).populate("categoria");

      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

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
      const { nome, rua, numero, complemento, bairro, cidade, estado, cep } = req.body;

      const endereco = new Endereco({ rua, numero, complemento, bairro, cidade, estado, cep });
      await endereco.save();

      const deposito = new Deposito({ nome, endereco: endereco._id });
      await deposito.save();
      return res.status(201).json(deposito);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar deposito" });
    }
  }

  async listar_depositos(req, res) {
    try {
      const depositos = await Deposito.find().populate("endereco");
      return res.status(200).json(depositos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar depositos" });
    }
  }

  async listar_cod(req, res) {
    try {
      const { cod_deposito } = req.params;
      const deposito = await Deposito.findOne({ cod_deposito }).populate("endereco");
      return res.status(200).json(deposito);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar deposito" });
    }
  }

  // exclui o deposito e o endereco
  async excluir(req, res) {
    try {
      const { cod_deposito } = req.params;
      const deposito = await Deposito.findOne({ cod_deposito: cod_deposito });
      if (!deposito) {
        return res.status(404).json({ error: "Depósito não encontrado" });
      }

      await Deposito.findByIdAndDelete(deposito._id);

      return res.status(200).json({ message: "Depósito excluído com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao excluir deposito" });
    }
  }
}

class MovimentoController {
  // cod_movimento, itens, motivo, documento, data_criacao, deposito_origem, local_destino, array de itens.

  async criar(req, res) {
    try {
      const { itens, motivo, documento, deposito_origem, local_destino } = req.body;

      // procura o deposito de origem
      const origem = await Deposito.findOne({ cod_deposito: deposito_origem });

      if (!origem) {
        return res.status(404).json({ error: "Depósito de origem não encontrado" });
      }

      // procura o deposito de destino
      const destino = await Deposito.findOne({ cod_deposito: local_destino });
      if (!destino) {
        return res.status(404).json({ error: "Depósito de destino não encontrado" });
      }

      // verifica se o deposito de origem é o mesmo do destino
      if (origem._id === destino._id) {
        return res.status(404).json({ error: "Depósito de origem e destino não podem ser iguais" });
      }

      console.log(itens[0]);
      const itens_id = [];
      let valor_total = 0.0;
      // verifica se os itens existem
      for (let i = 0; i < itens.length; i++) {
        // procura pelo itemMovimento no banco
        const item = await ItemMovimento.findOne({ cod_item: itens[i] });
        itens_id.push(item._id);
        // cria o valor total do movimento
        valor_total += item.valor_unitario * item.quantidade;

        //console.log(item);
        if (!item) {
          return res.status(404).json({ error: "Item não encontrado" });
        }
      }

      // cria um movimento com os dados validados
      const movimento = new Movimento({
        // array de itens
        itens: itens_id,
        motivo,
        documento,
        deposito_origem: origem._id,
        local_destino: destino._id,
        valor_total,
      });

      await movimento.save();

      return res.status(201).json(movimento);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar movimento" });
    }
  }

  async listar_movimentos(req, res) {
    try {
      const movimentos = await Movimento.find()
        .populate("deposito_origem")
        .populate("local_destino")
        .populate("itens");
      return res.status(200).json(movimentos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar movimentos" });
    }
  }
}

class ItensMovimentoController {
  // cod_item, valor_unitario, cod_movimento, cod_produto, quantidade

  async criar(req, res) {
    try {
      const itens = req.body;
      // percore o array de itens e verifica se o produto existe
      itens.forEach(async (item) => {
        const { produto } = item;
        const produtoConsulta = await Produto.findOne({ cod_produto: produto });

        if (!produto) {
          return res.status(404).json({ error: "Produto não encontrado" });
        }
        const itemMovimento = new ItemMovimento({
          valor_unitario: item.valor_unitario,
          produto: produtoConsulta._id,
          quantidade: item.quantidade,
        });

        itemMovimento.save();
      });

      return res.status(201).json(itens);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao criar item" });
    }
  }

  async listar_itensOld(req, res) {
    try {
      const itens = await ItemMovimento.find().populate("produto");
      return res.status(200).json(itens);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar itens" });
    }
  }

  async listar_itens(req, res) {
    const itensEncontratos = await ItemMovimento.find().populate("produto");

    const itens = [];

    for (const item of itensEncontratos) {
      const { cod_item } = item;

      const itemEncontrado = await ItemMovimento.findOne({ cod_item }).populate("produto");

      if (!itemEncontrado) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      const produto = await Produto.findOne({ cod_produto: itemEncontrado.produto.cod_produto }).populate("categoria");

      if (!produto) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      const item_completo = {
        cod_item: item.cod_item,
        valor_unitario: item.valor_unitario,
        quantidade: item.quantidade,
        cod_produto: produto.cod_produto,
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: produto.categoria.nome,
        cod_categoria: produto.categoria.cod_categoria,
      };

      itens.push(item_completo);
    }

    // itens_completos agora contém os itens no formato desejado

    return res.status(200).json(itens);
  }

  async listar_cod(req, res) {
    try {
      const { cod_item } = req.params;

      const item = await ItemMovimento.findOne({ cod_item }).populate("produto");

      if (!item) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      const produto = await Produto.findOne({ cod_produto: item.produto.cod_produto }).populate("categoria");

      const item_completo = {
        cod_item: item.cod_item,
        valor_unitario: item.valor_unitario,
        quantidade: item.quantidade,
        cod_produto: produto.cod_produto,
        nome: produto.nome,
        descricao: produto.descricao,
        categoria: produto.categoria.nome,
        cod_categoria: produto.categoria.cod_categoria,
      };

      return res.status(200).json({ item_completo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao listar item" });
    }
  }

  async excluir(req, res) {
    try {
      const { cod_item } = req.params;
      const item = await ItemMovimento.findOne({ cod_item: cod_item });
      if (!item) {
        return res.status(404).json({ error: "Item não encontrado" });
      }

      await ItemMovimento.findByIdAndDelete(item._id);

      return res.status(200).json({ message: "Item excluído com sucesso" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Erro ao excluir item" });
    }
  }
}

const depositoController = new DepositoController();
const produtoController = new ProdutoController();
const categoriaController = new CategoriaController();
const movimentoController = new MovimentoController();
const itensMovimentoController = new ItensMovimentoController();

module.exports = {
  categoriaController,
  produtoController,
  depositoController,
  movimentoController,
  itensMovimentoController,
};
