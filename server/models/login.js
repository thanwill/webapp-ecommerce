const moongose = require('mongoose');
const loginSchema = new moongose.Schema({
    // Login de usuário e validação de sessão utilizando JWT.
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    
});
const Login = moongose.model("Login", loginSchema);
module.exports = Login;

    