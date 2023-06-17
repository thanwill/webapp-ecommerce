import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// busca por todas as categorias
export const CategoriaService = {
  async listar() {
    try {
      const response = await api.get("/categoria");
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // busca a cateogoria pelo id dela
    async buscar(id) {
        try {
            const response = await api.get(`/categoria/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
        }
};

export const ProdutoService = {
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
  

