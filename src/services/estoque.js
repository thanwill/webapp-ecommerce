// arquivo services do react
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// cria um usuario
export const EnderecoServices = {
  // criar um endereco
  async criar(endereco) {
    try {
      const response = await api.post("/endereco", endereco);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // listar todos os enderecos
  async listar() {
    try {
      const response = await api.get("/endereco");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const DepositosServices = {
  // lista todos os depositos
  async listar() {
    try {
      const response = await api.get("/deposito");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const ProdutosServices = {
  // lista todos os produtos
  async listar() {
    try {
      const response = await api.get("/produto");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export const ItensServices = {
  // lista todos os itens
  async listar() {
    try {
      const response = await api.get("movimento/itens");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async criar(item) {
    try {
      const response = await api.post("movimento/itens", item);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // busca um item pelo id
  async buscar(id) {
    try {
      const response = await api.get(`/movimento/itens/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  // exclui um item pelo id
  async excluir(id) {
    try {
      const response = await api.delete(`/movimento/itens/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
