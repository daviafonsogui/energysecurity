import WebSocket from 'ws';

// Endereço do servidor WebSocket local
const ws = new WebSocket('https://energysecurity.onrender.com/ws');

// Quando conectar
ws.on('open', () => {
  console.log('Conectado ao servidor WS!');

  // Envia mensagem inicial
  ws.send('Olá do cliente Node.js!');
});

// Quando receber mensagem
ws.on('message', (message) => {
  console.log('Mensagem recebida do servidor:', message.toString());
});

// Quando houver erro
ws.on('error', (err) => {
  console.error('Erro WS:', err.message);
});

// Quando a conexão fechar
ws.on('close', () => {
  console.log('Conexão fechada!');
});
