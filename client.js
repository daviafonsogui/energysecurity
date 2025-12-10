import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import axios from "axios";

// Regex melhorado para ler cada sensor
const regex = /S(\d+)\s+Corrente:\s*([\d.]+)\s*A\s*\|\s*Pot[eê]ncia:\s*([\d.]+)\s*W/i;

// Armazena leituras temporárias
let buffer = {
    s1: null,
    s2: null,
    s3: null
};

// Processa cada linha recebida
function processarLinha(linha) {
    const match = linha.match(regex);

    if (!match) {
        console.log("⚠ Formato inválido:", linha);
        return;
    }

    const sensorId = parseInt(match[1]); // 1, 2 ou 3
    const corrente = parseFloat(match[2]);
    const potencia = parseFloat(match[3]);
    const ativo = potencia > 3;

    const key = `s${sensorId}`;

    buffer[key] = { corrente, potencia, ativo };

    console.log(`📥 Sensor ${key} atualizado:`, buffer[key]);

    // Se já tiver os três sensores → envia JSON
    if (buffer.s1 && buffer.s2 && buffer.s3) {
        enviarDados(buffer);

        // zera buffer para próxima leitura
        buffer = { s1: null, s2: null, s3: null };
    }
}

async function enviarDados(jsonFinal) {
    try {
        console.log("📤 Enviando JSON final:", jsonFinal);

        const response = await axios.post(
            "https://energysecurity.onrender.com/api/esp",
            jsonFinal,
            { timeout: 5000 }
        );

        console.log("✅ Enviado com sucesso:", response.data);

    } catch (error) {
        console.error("❌ Erro ao enviar dados:", error.message);
    }
}

// =======================
// CONFIG PORTA SERIAL
// =======================

const porta = "/dev/ttyUSB0";
const baud = 9600;

const serial = new SerialPort({
    path: porta,
    baudRate: baud,
});

const parser = serial.pipe(new ReadlineParser({ delimiter: "\n" }));

serial.on("open", () => {
    console.log("📡 Porta serial aberta:", porta);
});

parser.on("data", (linha) => {
    console.log("📨 Recebido:", linha.trim());
    processarLinha(linha.trim());
});

serial.on("error", (err) => {
    console.error("❌ Erro serial:", err);
});
