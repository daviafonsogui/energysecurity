import express from "express";
import auth from "./auth.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router()

router.use(auth)

router.get('/mymonitor', (req, res) => {
  res.sendFile(path.join(__dirname, '/mymonitor.html'));
})



router.post('/api/esp', (req, res) => {
  console.log(req.body)
  res.send('Birds home page')
})


export default router