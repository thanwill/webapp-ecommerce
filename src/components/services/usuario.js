// arquivo services do react
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// cria um usuario
export const UsuarioService = {
  async criar(usuario) {
    try {
      await api.post('/usuario', usuario).then((response) => {
        return response.data;
      });
    } catch (error) {
      console.error(error);
    }
    
  },
  // exibe um usuario pelo id
  async exibir(id) {
    try {
      const response = await api.get(`/usuario/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
