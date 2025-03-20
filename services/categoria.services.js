import Categoria from "../models/categoria.model.js";

export const categoriaService = {
  // Método para buscar todas as categorias
  async getAll(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json({
        size: categorias?.length,
        data: categorias,
      });
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ mensagem: `Erro ao buscar categorias: ${error}` });
    }
  },

  // Método para buscar uma categoria por ID
  async getById(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada" });
      }
      res.status(200).json(categoria);
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ mensagem: "Erro ao buscar categoria" });
    }
  },

  // Método para criar uma nova categoria
  async create(req, res) {
    const { nome } = req.body;

    // Verifica se a categoria já existe
    const categoriaExistente = await Categoria.findOne({ where: { nome } });
    if (categoriaExistente) {
      return res.status(400).json({ mensagem: "Categoria já existe" });
    }

    const novaCategoria = await Categoria.create({ nome });
    res.status(201).json(novaCategoria);
  },

  // Método para atualizar uma categoria
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada" });
      }

      await categoria.update({ nome });
      res.status(200).json(categoria);
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ mensagem: "Erro ao atualizar categoria" });
    }
  },

  // Método para deletar uma categoria
  async delete(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);

      if (!categoria) {
        return res.status(404).json({ mensagem: "Categoria não encontrada" });
      }

      await categoria.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("[ERRO]:", error);
      res.status(500).json({ mensagem: "Erro ao excluir categoria" });
    }
  },
};
