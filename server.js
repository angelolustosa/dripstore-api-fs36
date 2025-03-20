import express from 'express';
import { iniciarBanco } from './db/sync.js';
import { produtoController } from './controllers/produto.controller.js';
import { categoriaController } from './controllers/categoria.controller.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const HOST = '127.0.0.1';
const PORT = 3000;

// Iniciar o banco e verificar a necessidade de conexão
iniciarBanco();

app.get('/', (req, res) => {
  res.send('Olá Mundo!');
});

produtoController(app);
categoriaController(app);

app.listen(PORT, HOST, () => {
  console.log(`App de exemplo está rodando em http://${HOST}:${PORT}`);
});
