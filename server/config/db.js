const mongoose = require('mongoose');
// banco de dados local
const mongoDBURL = 'mongodb://localhost:27017/catalogo';
// banco de dados no MongoDB Atlas hospedado no Railway
//const mongoDBURL = 'mongodb://mongo:v6VkU3iApbmdr2w7uzgg@containers-us-west-160.railway.app:6723';

const connectDB = () => {
    mongoose.connect(mongoDBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log('Conexão com o banco de dados estabelecida com sucesso.');
        })
        .catch((error) => {
            console.error('Erro ao conectar-se ao banco de dados:', error);
        });
};

module.exports = connectDB;