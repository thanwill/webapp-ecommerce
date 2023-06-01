var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET de erro caso a rota nao exista
router.get('*', function(req, res, next) {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

module.exports = router;
