import express from 'express';
import { iniciarBanco } from './db/sync.js';
import cors from 'cors';
import routes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger/swagger.config.js';

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);


app.use(express.json());
app.use(cors());

const HOST = '127.0.0.1';
const PORT = 3000;

// Iniciar o banco e verificar a necessidade de conexão
iniciarBanco();


// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes(app)

app.listen(PORT, HOST, () => {
  console.log(`App de exemplo está rodando em http://${HOST}:${PORT}`);
});
