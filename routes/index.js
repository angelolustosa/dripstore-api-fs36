import swaggerJSDoc from "swagger-jsdoc";
import { categoriaController } from "../controllers/categoria.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { produtoController } from "../controllers/produto.controller.js";
import { usuarioController } from "../controllers/usuario.controller.js";
import { swaggerOptions } from "../config/swagger/swagger.config.js";
import swaggerUi from 'swagger-ui-express';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send("Servidor rodando!");
  });

  produtoController(app);
  categoriaController(app);
  loginController(app);
  usuarioController(app);

  // Documentação Swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default routes;
