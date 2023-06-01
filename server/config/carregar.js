require('./db');
const mongoose = require("mongoose");
const Filme = require("../models/filme");
const filmes = require("./filmes.json");

async function carregar() {
    try {
        await Filme.deleteMany({}); // limpa a coleção
        for (const filme of filmes) {
            await Filme.create(filme);
        }
        console.log("Carga de filmes feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}
// carrega os dados de filmes.json no banco de dados MongoDB
//carregar();
