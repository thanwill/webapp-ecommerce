// Description: Controller para autenticação de usuários
// importa o usuario model
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const secretKey = "suaChaveSecreta"; // Chave secreta para assinar os tokens JWT
const bcrypt = require("bcryptjs");

function generateToken(user) {
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: "3000" });
}

function authenticateUser(email, senha) {
  // procura o usuário no banco de dados pelo email
  const user = Usuario.findOne({ email: email });

  if (!user) {
    return {
      error: "Usuário não encontrado",
    };
  }

  // compara a senha informada com a senha do banco de dados
  const isValidPassword = bcrypt.compareSync(senha, user.senha);

  if (!isValidPassword) {
    return {
      error: "Senha inválida",
    };
  }
  // se a senha for valida, retorna o usuário com o token do jwt
  return { user };
}

module.exports = {
  login(req, res) {
    const { email, senha } = req.body;
    const user = authenticateUser(email, senha);

    if (user) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Credenciais inválidas." });
    }
  },

  protectedRoute(req, res) {
    res.json({ message: "Rota protegida acessada com sucesso!", user: req.user });
  },
};
