import express from "express";
import { loginService } from "../services/login.service.js";
import verificarCadastro from "../middlewares/cadastro.middleware.js";

const router = express.Router();

export const loginController = (app) => {
  router
    .get("/cadastrar", [ verificarCadastro.verificarDuplicadadeNomeOrCpfOrEmail, verificarCadastro.verificaSePapelExiste ], loginService.cadastrar)
    .get("/login", loginService.login);

  app.use("/auth", router);
};

export default router;
