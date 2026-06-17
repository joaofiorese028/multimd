// Importa o Express para criar as rotas de autenticação.
const express = require('express');
// Cria um roteador específico para login.
const router = express.Router();
// Importa a lista de clientes para verificar e-mail e senha.
const { clientes } = require('../db/data');

// Rota POST /api/auth/login: realiza login simples.
router.post('/login', (req, res) => {
  // Pega o e-mail enviado no corpo da requisição.
  const email = req.body.email;
  // Pega a senha enviada no corpo da requisição.
  const senha = req.body.senha;
  // Procura um cliente com o mesmo e-mail e senha.
  const cliente = clientes.find((item) => item.email === email && item.senha === senha);
  // Se não encontrar, retorna erro de login.
  if (!cliente) return res.status(401).json({ erro: 'E-mail ou senha inválidos.' });
  // Se encontrar, cria um objeto com os dados públicos do usuário.
  const usuarioLogado = { id: cliente.id, nome: cliente.nome, email: cliente.email };
  // Retorna os dados do usuário logado.
  res.json({ mensagem: 'Login realizado com sucesso.', usuario: usuarioLogado });
});

// Exporta as rotas de autenticação.
module.exports = router;
