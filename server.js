// Importa o framework Express, que ajuda a criar o servidor e as rotas da API.
const express = require('express');
// Importa o módulo path, usado para montar caminhos de arquivos de forma segura.
const path = require('path');
// Importa as rotas responsáveis pelos produtos do e-commerce.
const produtosRoutes = require('./src/routes/produtos');
// Importa as rotas responsáveis pelos clientes do e-commerce.
const clientesRoutes = require('./src/routes/clientes');
// Importa as rotas responsáveis pelo login do usuário.
const authRoutes = require('./src/routes/auth');
// Importa as rotas responsáveis pelo carrinho de compras.
const carrinhoRoutes = require('./src/routes/carrinho');
// Importa as rotas responsáveis pela finalização/listagem de compras.
const comprasRoutes = require('./src/routes/compras');

// Cria a aplicação Express, que será o nosso servidor web.
const app = express();
// Define a porta em que o servidor vai rodar no computador.
const PORT = 3000;

// Habilita o Express para entender dados enviados em formato JSON no corpo das requisições.
app.use(express.json());
// Habilita a pasta public para servir arquivos HTML, CSS e JS diretamente no navegador.
app.use(express.static(path.join(__dirname, 'public')));


// Rota principal: quando acessar http://localhost:3000, abre a página inicial.
// Observação: como não existe index.html, precisamos indicar qual HTML será a página inicial.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'multimed.html'));
});

// Conecta todas as rotas de produtos ao endereço base /api/produtos.
app.use('/api/produtos', produtosRoutes);
// Conecta todas as rotas de clientes ao endereço base /api/clientes.
app.use('/api/clientes', clientesRoutes);
// Conecta todas as rotas de autenticação/login ao endereço base /api/auth.
app.use('/api/auth', authRoutes);
// Conecta todas as rotas do carrinho ao endereço base /api/carrinho.
app.use('/api/carrinho', carrinhoRoutes);
// Conecta todas as rotas de compras ao endereço base /api/compras.
app.use('/api/compras', comprasRoutes);

// Cria uma rota simples para testar se a API está funcionando.
app.get('/api/saude', (req, res) => {
  // Envia uma resposta JSON confirmando que o servidor está online.
  res.json({ mensagem: 'API do e-commerce funcionando corretamente!' });
});

// Inicia o servidor e deixa ele escutando requisições na porta definida.
app.listen(PORT, () => {
  // Mostra no terminal o endereço local para acessar o projeto.
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

