import { categoriaController } from "../controllers/categoria.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { produtoController } from "../controllers/produto.controller.js";
import { usuarioController } from "../controllers/usuario.controller.js";

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send("Servidor rodando!");
  });

  produtoController(app);
  categoriaController(app);
  loginController(app);
  usuarioController(app);
};

export default routes;
