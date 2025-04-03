/* import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Dripstore API',
        version: '1.0.0',
        description: 'API documentation for Dripstore',
    },
    servers: [
        {
            url: 'http://localhost:3000', // Update with your server URL
            description: 'Development server',
        },
    ],
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, '../controllers/*.js')], // Path to the controllers
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at http://localhost:3000/api-docs');
};

export default setupSwagger; */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('__dirname:', join(__dirname, '../controllers/*.js'));


export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Produtos',
      version: '1.0.0',
      description: 'Documentação da API de Produtos usando Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
  },
  //apis: [join(__dirname, '../../controllers/*.js')], // Caminho correto para os controllers
  apis: [join(__dirname, "../../controllers/swagger/*.js")], // Lendo as anotações do Swagger separadamente
};

