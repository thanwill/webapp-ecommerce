
function gerarCodigo(prefixo) {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    const milisegundo = data.getMilliseconds();
    const codigo = `${prefixo}${ano}${mes}${dia}${hora}${minuto}${segundo}${milisegundo}`;
    return codigo;
  }
  
  module.exports = {gerarCodigo};
  