// Este arquivo simula um banco de dados usando arrays em memória.
// Quando o servidor reinicia, os dados voltam ao estado inicial.

// Lista inicial de produtos disponíveis na loja.
const produtos = [
  // Cada produto possui id, nome, categoria, preço, estoque e imagem ilustrativa.
  { id: 1, nome: 'Notebook Pro 15', categoria: 'Informática', preco: 4200, estoque: 5, imagem: '💻' },
  // Produto de exemplo usado para demonstrar cadastro, listagem e carrinho.
  { id: 2, nome: 'Mouse Gamer', categoria: 'Acessórios', preco: 120, estoque: 20, imagem: '🖱️' },
  // Produto de exemplo usado para mostrar cálculo de total no carrinho.
  { id: 3, nome: 'Teclado Mecânico', categoria: 'Acessórios', preco: 280, estoque: 12, imagem: '⌨️' },
  // Produto de exemplo usado para mostrar categorias diferentes.
  { id: 4, nome: 'Smartphone X', categoria: 'Celulares', preco: 2500, estoque: 8, imagem: '📱' }
];

// Lista inicial de clientes cadastrados na loja.
const clientes = [
  // Cliente usado para testar login e compras.
  { id: 1, nome: 'Ana Souza', email: 'ana@email.com', senha: '123456' },
  // Outro cliente de exemplo para demonstrar listagem de clientes.
  { id: 2, nome: 'Carlos Lima', email: 'carlos@email.com', senha: '123456' }
];

// Carrinho iniciado vazio; os produtos serão adicionados conforme o usuário clicar em comprar.
const carrinho = [];

// Lista de compras finalizadas, inicialmente vazia.
const compras = [];

// Exporta os arrays para que outros arquivos possam acessar e modificar esses dados.
module.exports = { produtos, clientes, carrinho, compras };
