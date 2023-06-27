// arquivo services do react para filmes
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const FilmesService = {
  // lista os filmes
  async listar() {
    try {
      const response = await api.get('/filme');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async deletar(id) {
    try {
      const response = await api.delete(`/filme/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  
};
