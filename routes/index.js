import { categoriaController } from "../controllers/categoria.controller.js";
import { produtoController } from "../controllers/produto.controller.js";

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send("Olá Mundo!");
  });

  produtoController(app);
  categoriaController(app);
};

export default routes;
