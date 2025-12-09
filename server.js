import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import cors from  'cors';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';

import router from './private/apiesprouters.js';


// Caminhos no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(cors())





// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

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


app.post("/api/esp", (req, res) => {
    const dados = req.body;

    console.log("Dados recebidos do ESP:", dados);




    res.json({
        status: "OK",
        recebido: dados
    });
});



// Inicia servidor HTTPS
const PORT = 443;
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTPS rodando em https://meu-site.com`);
});



