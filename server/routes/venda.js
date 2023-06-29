// necessário salvar o token no localstorage do navegador
const express = require("express");
const router = express.Router();
const Venda = require("../logic/venda");

// lista das vendas
router.get("/", async (req, res) => {
  try {
    await Venda.listaVendas(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar vendas!",
    });
  }
});

// cria uma venda
router.post("/", async (req, res) => {
  try {
    await Venda.gerarVenda(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao criar venda!",
    });
  }
});

// cria os detalhes da venda
router.post("/detalhes/", async (req, res) => {
    try {
        await Venda.gerarDetalhes(req, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Erro ao criar detalhes da venda!",
        });
    }
});

// lista dos detalhes
router.get("/detalhes", async (req, res) => {
  try {
    await Venda.listaDetalhes(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao listar vendas!",
    });
  }
});


// lista as movimentações de uma venda
router.get("/movimentacoes/", async (req, res) => {
    try {
        await Venda.listaTransacoes(req, res);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Erro ao listar movimentações!",
        });
    }
});

router.post("/movimentacoes", async (req, res) => {
  try {
    await Venda.criaTransacao(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao criar venda!",
    });
  }
});


module.exports = router;
