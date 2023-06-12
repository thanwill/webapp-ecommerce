// arquivo services do react
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// cria um usuario
export const UsuarioService = {
  async criar(usuario) {
    try {
      const response = await api.post("/usuario", usuario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // exclui um usuario pelo id
  async excluir(id) {
    try {
      await api.delete(`/usuario/${id}`).then(response => {
        return response.data;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // exibe um usuario pelo id
  async exibir(id) {
    try {
      const response = await api.get(`/usuario/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // lista os usuarios
  async listar() {
    try {
      const response = await api.get("/usuario");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  // atualiza um usuario pelo id
  async atualizar(id, usuario) {
    try {
      await api.put(`/usuario/${id}`, usuario).then(response => {
        return response.data;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
