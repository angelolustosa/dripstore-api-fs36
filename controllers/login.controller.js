import express from "express";
import { loginService } from "../services/login.service.js";
import verificarCadastro from "../middlewares/cadastro.middleware.js";

const router = express.Router();

export const loginController = (app) => {
  router
    .post("/cadastrar", [ verificarCadastro.verificarDuplicadadeNomeOrCpfOrEmail, verificarCadastro.verificaSePapelExiste ], loginService.cadastrar)
    .post("/login", loginService.login);

  app.use("/api/auth", router);
};

export default router;
