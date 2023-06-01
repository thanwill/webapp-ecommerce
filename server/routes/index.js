var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET de erro caso a rota nao exista
router.get('*', function(req, res, next) {
  res.status(404).json({
    error: 'Rota não encontrada'
  });
});

module.exports = router;
