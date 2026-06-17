// Função auxiliar para retornar erro de validação de forma padronizada.
function erroValidacao(res, mensagem) {
  // Define o status 400, indicando que o cliente enviou dados inválidos.
  return res.status(400).json({ erro: mensagem });
}

// Função auxiliar para retornar erro de item não encontrado.
function naoEncontrado(res, mensagem) {
  // Define o status 404, indicando que o recurso solicitado não foi encontrado.
  return res.status(404).json({ erro: mensagem });
}

// Exporta as funções para serem usadas nas rotas.
module.exports = { erroValidacao, naoEncontrado };
