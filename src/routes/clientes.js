// Importa o Express para criação das rotas.
const express = require('express');
// Cria um roteador específico para clientes.
const router = express.Router();
// Importa o array de clientes que simula o banco de dados.
const { clientes } = require('../db/data');
// Importa a função de validação de clientes.
const { validarCliente } = require('../validators/clientes');
// Importa funções auxiliares de erro.
const { erroValidacao, naoEncontrado } = require('../utils/http');

// Rota GET /api/clientes: lista todos os clientes.
router.get('/', (req, res) => {
  // Remove a senha antes de enviar os clientes para o front-end.
  const clientesSemSenha = clientes.map(({ senha, ...cliente }) => cliente);
  // Retorna os clientes sem expor a senha.
  res.json(clientesSemSenha);
});

// Rota POST /api/clientes: cadastra um novo cliente.
router.post('/', (req, res) => {
  // Guarda os dados enviados pelo formulário.
  const dados = req.body;
  // Valida se nome, e-mail e senha foram preenchidos corretamente.
  const erro = validarCliente(dados);
  // Se existir erro, retorna a mensagem.
  if (erro) return erroValidacao(res, erro);
  // Verifica se já existe cliente com o mesmo e-mail.
  const emailExiste = clientes.some((cliente) => cliente.email === dados.email);
  // Se o e-mail já existir, impede cadastro duplicado.
  if (emailExiste) return erroValidacao(res, 'Já existe cliente cadastrado com este e-mail.');
  // Cria o próximo id do cliente.
  const novoId = clientes.length ? clientes[clientes.length - 1].id + 1 : 1;
  // Monta o objeto do novo cliente.
  const novoCliente = {
    id: novoId,
    nome: dados.nome,
    email: dados.email,
    telefone: dados.telefone || '',
    cpf: dados.cpf || '',
    senha: dados.senha
  };
  // Adiciona o cliente ao array.
  clientes.push(novoCliente);
  // Retorna o cliente sem a senha para proteger a informação.
  res.status(201).json({ id: novoCliente.id, nome: novoCliente.nome, email: novoCliente.email });
});

// Rota DELETE /api/clientes/:id: remove um cliente pelo id.
router.delete('/:id', (req, res) => {
  // Converte o id recebido para número.
  const id = Number(req.params.id);
  // Procura a posição do cliente no array.
  const indice = clientes.findIndex((cliente) => cliente.id === id);
  // Se o cliente não existir, retorna erro 404.
  if (indice === -1) return naoEncontrado(res, 'Cliente não encontrado.');
  // Remove o cliente do array.
  const removido = clientes.splice(indice, 1);
  // Retorna mensagem de sucesso.
  res.json({ mensagem: 'Cliente removido com sucesso.', cliente: { id: removido[0].id, nome: removido[0].nome, email: removido[0].email } });
});

// Exporta as rotas de clientes.
module.exports = router;
