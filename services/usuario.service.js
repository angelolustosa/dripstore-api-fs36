import Usuario from "../models/usuario.model.js";

export const usuarioService = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ message: `Erro ao buscar usuários: ${error}` });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ message: "Erro ao buscar usuário" });
    }
  },
  create: async (req, res) => {
    try {
      const novoUsuario = await Usuario.create(req.body);
      res.status(201).json(novoUsuario);
    } catch (error) {
      console.error("[ERRO]:", error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => err.message),
        });
      }
      res.status(500).json({ message: "Erro ao criar usuário" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      await usuario.update(req.body);
      res.status(200).json(usuario);
    } catch (error) {
      console.error("[ERRO]:", error);
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors.map((err) => err.message),
        });
      }
      res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ message: "Erro ao excluir usuário" });
    }
  },
};
