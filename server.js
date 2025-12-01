import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';

// Caminhos no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// HTTPS - caminho para certificados


// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas HTTP
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/cadastro.html'));
});

app.get('/catalogo', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/catalogo.html'));
});

// Inicia servidor HTTPS
const PORT = 443;
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTPS rodando em https://meu-site.com`);
});

// WebSocket seguro (WSS)
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('Cliente conectado via WSS');

  ws.on('message', (message) => {
    console.log('Mensagem recebida:', message.toString());

    // Enviar a mensagem para todos os clientes conectados
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(`Servidor recebeu: ${message}`);
      }
    });
  });

  ws.send('Conexão WSS estabelecida!');
});
