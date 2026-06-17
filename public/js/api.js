const API_BASE = '/api';

async function api(caminho, opcoes = {}) {
  const resposta = await fetch(API_BASE + caminho, {
    method: opcoes.method || 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: opcoes.body ? JSON.stringify(opcoes.body) : undefined
  });

  const dados = await resposta.json();

  if (!resposta.ok) throw new Error(dados.erro || 'Erro na requisição.');

  return dados;
}

function salvarUsuario(usuario) {
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}

function obterUsuario() {
  const texto = localStorage.getItem('usuarioLogado');
  return texto ? JSON.parse(texto) : null;
}

function sair() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'login.html';
}
