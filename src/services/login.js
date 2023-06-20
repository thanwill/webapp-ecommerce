// arquivo services do react
import axios from "axios";



const api = axios.create({
  baseURL: "http://localhost:3000",
});



/*
api.post('/auth', bodyParam)
            .then((response) => {
                console.log(response.data)
                alert(" Token gerado para o usuario " + response.data.nome)
                localStorage.setItem("token", response.data.token);
                navigate("/");
            })
            .catch((err) => {
                console.error(err.response.data) // Objeto de erro vindo do axios
                alert(" Ocorreu um erro! " + err.response.data.error)
            })
            .finally(() => {
                setEmail("")
                setSenha("")
            })*/

export const AuthService = {
//navigate = useNavigate(),
    
  async login(email, senha) {
    //const navigate = useNavigate();
    try {
      const response = await api.post("/auth", { email, senha });
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  // get token
  async getToken() {
    const token = localStorage.getItem("token");
    return token;
  }
};
