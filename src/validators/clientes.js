// Função responsável por validar os dados de cadastro de cliente.
function validarCliente(dados) {
  // Verifica se o nome do cliente foi preenchido.
  if (!dados.nome) return 'O nome do cliente é obrigatório.';
  // Verifica se o e-mail foi preenchido.
  if (!dados.email) return 'O e-mail do cliente é obrigatório.';
  // Verifica se o e-mail possui o caractere @, uma validação simples para fins didáticos.
  if (!dados.email.includes('@')) return 'O e-mail informado é inválido.';
  // Verifica se a senha foi preenchida.
  if (!dados.senha) return 'A senha é obrigatória.';
  // Validação simples para fins didáticos: senha com pelo menos 6 caracteres.
  if (String(dados.senha).length < 6) return 'A senha precisa ter pelo menos 6 caracteres.';
  // Retorna null quando os dados estão corretos.
  return null;
}

// Exporta a função para ser usada nas rotas de clientes.
module.exports = { validarCliente };
