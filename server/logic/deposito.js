// cria uma classe de lógica para os processos do depósito

const { Movimento } = require("../models/estoque");

class MovimentoLogic {

    // cria um novo movimento
    async createMovimento(movimento) {
        const mov = new Movimento(movimento);
        return await mov.save();
    }

}
