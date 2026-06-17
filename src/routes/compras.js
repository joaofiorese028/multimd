const express = require('express');
const router = express.Router();

const { carrinho, compras, produtos } = require('../db/data');
const { erroValidacao } = require('../utils/http');

function montarItensCompra() {
  return carrinho.map((item) => {
    const produto = produtos.find((registro) => registro.id === item.produtoId);

    return {
      produtoId: item.produtoId,
      nome: produto ? produto.nome : 'Produto removido',
      quantidade: item.quantidade,
      precoUnitario: produto ? produto.preco : 0,
      subtotal: produto ? produto.preco * item.quantidade : 0
    };
  });
}

router.get('/', (req, res) => {
  res.json(compras);
});

router.post('/', (req, res) => {
  if (!carrinho.length) {
    return erroValidacao(res, 'O carrinho esta vazio.');
  }

  const itens = montarItensCompra();

  for (const item of carrinho) {
    const produto = produtos.find((registro) => registro.id === item.produtoId);
    if (!produto || produto.estoque < item.quantidade) {
      return erroValidacao(res, 'Nao foi possivel concluir a compra por falta de estoque.');
    }
  }

  for (const item of carrinho) {
    const produto = produtos.find((registro) => registro.id === item.produtoId);
    produto.estoque -= item.quantidade;
  }

  const total = itens.reduce((acumulado, item) => acumulado + item.subtotal, 0);
  const compra = {
    id: compras.length ? compras[compras.length - 1].id + 1 : 1,
    cliente: req.body.cliente || 'Cliente nao identificado',
    data: new Date().toISOString(),
    itens,
    total
  };

  compras.push(compra);
  carrinho.splice(0, carrinho.length);

  res.status(201).json({
    mensagem: 'Compra finalizada com sucesso.',
    compra
  });
});

module.exports = router;
