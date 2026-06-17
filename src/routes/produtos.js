const express = require('express');
const router = express.Router();

const { produtos } = require('../db/data');
const { naoEncontrado } = require('../utils/http');

router.get('/', (req, res) => {
  res.json(produtos);
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((item) => item.id === id);

  if (!produto) {
    return naoEncontrado(res, 'Produto nao encontrado.');
  }

  res.json(produto);
});

module.exports = router;
