import fs from 'fs';
import path from 'path';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import cors from  'cors';
import { WebSocketServer } from 'ws';
import { fileURLToPath } from 'url';

import router from './private/apiesprouters.js';



function salvarJSON(dados) {
    const filePath = path.join(process.cwd(), "./dados.json");
    try {
        // Converte o objeto para JSON formatado
        const conteudo = JSON.stringify(dados, null, 2);

        // Sobrescreve o arquivo completamente
        fs.writeFileSync(filePath, conteudo, "utf8");

        console.log("JSON salvo em dados.json");
    } catch (erro) {
        console.error("Erro ao salvar JSON:", erro);
    }
}
function lerJSON() {
    const filePath = path.join(process.cwd(), "./dados.json");

    try {
        if (!fs.existsSync(filePath)) {
            console.warn("Arquivo dados.json não encontrado.");
            return null;
        }

        const conteudo = fs.readFileSync(filePath, "utf8");
        return JSON.parse(conteudo);

    } catch (erro) {
        console.error("Erro ao ler JSON:", erro);
        return null;
    }
}

// Caminhos no ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json())
app.use(cors({
    origin: "*",      // ou coloque o domínio do seu frontend
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));





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
  console.log("a")
    salvarJSON(dados);
    res.json({ok:true});
});


app.get("/api/espdata", (req, res) => {
    const Values = lerJSON("dados.json")
    res.json(Values)
});


// Inicia servidor HTTPS
const PORT = process.env.PORT || 443;
const server = app.listen(PORT, () => {
  console.log(`Servidor HTTPS rodando em https://meu-site.com`);
});



