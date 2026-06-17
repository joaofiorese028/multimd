const express = require('express');
const router = express.Router();

const { carrinho, produtos } = require('../db/data');
const { erroValidacao, naoEncontrado } = require('../utils/http');

function montarCarrinhoDetalhado() {
  return carrinho.map((item) => {
    const produto = produtos.find((registro) => registro.id === item.produtoId);

    return {
      produtoId: item.produtoId,
      quantidade: item.quantidade,
      produto,
      subtotal: produto ? produto.preco * item.quantidade : 0
    };
  });
}

router.get('/', (req, res) => {
  const itens = montarCarrinhoDetalhado();
  const total = itens.reduce((acumulado, item) => acumulado + item.subtotal, 0);

  res.json({ itens, total });
});

router.post('/', (req, res) => {
  const produtoId = Number(req.body.produtoId);
  const quantidade = Number(req.body.quantidade || 1);

  if (!produtoId) {
    return erroValidacao(res, 'Informe um produto valido.');
  }

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return erroValidacao(res, 'A quantidade precisa ser um numero inteiro maior que zero.');
  }

  const produto = produtos.find((item) => item.id === produtoId);

  if (!produto) {
    return naoEncontrado(res, 'Produto nao encontrado.');
  }

  const itemExistente = carrinho.find((item) => item.produtoId === produtoId);
  const quantidadeAtual = itemExistente ? itemExistente.quantidade : 0;

  if (quantidadeAtual + quantidade > produto.estoque) {
    return erroValidacao(res, 'Quantidade indisponivel em estoque.');
  }

  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({ produtoId, quantidade });
  }

  res.status(201).json({
    mensagem: 'Produto adicionado ao carrinho.',
    carrinho: montarCarrinhoDetalhado()
  });
});

router.delete('/:produtoId', (req, res) => {
  const produtoId = Number(req.params.produtoId);
  const indice = carrinho.findIndex((item) => item.produtoId === produtoId);

  if (indice === -1) {
    return naoEncontrado(res, 'Item nao encontrado no carrinho.');
  }

  carrinho.splice(indice, 1);

  res.json({
    mensagem: 'Item removido do carrinho.',
    carrinho: montarCarrinhoDetalhado()
  });
});

module.exports = router;
