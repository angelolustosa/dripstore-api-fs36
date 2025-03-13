import Categoria from "../models/categoria.model.js";
import Produto from "../models/produto.model.js";

const categoriaService = {
  async getAll(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.status(200).json({
        size: categorias?.length,
        data: categorias
      });
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: `Erro ao buscar categorias: ${error}` });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).json({ mensagem: 'Categoria não encontrado' });
      }
      res.status(200).json(categoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao buscar categoria' });
    }
  },

  async create(req, res) {
    try {
      const { nome, codigo, descricao } = req.body;
      const novoCategoria = await Categoria.create({ nome, codigo, descricao });
      res.status(201).json(novoCategoria);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao criar categoria' });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, codigo, descricao } = req.body;

      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      await produto.update({ nome, preco, categoriaId });
      res.status(200).json(produto);
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar produto' });
    }
  },

  // Método para deletar um produto
  async delete(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }

      await produto.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('[ERRO]:', error);
      res.status(500).json({ mensagem: 'Erro ao excluir produto' });
    }
  }
};

export const insertCategories = async () => {
  try {
    const categories = [
      { codigo: 1, nome: 'Eletrônicos', descricao: 'Produtos eletrônicos como celulares, computadores e gadgets.' },
      { codigo: 2, nome: 'Roupas', descricao: 'Roupas masculinas e femininas, incluindo acessórios.' },
      { codigo: 3, nome: 'Alimentos', descricao: 'Alimentos perecíveis e não perecíveis.' },
      { codigo: 4, nome: 'Livros', descricao: 'Livros diversos, incluindo ficção e não ficção.' },
      { codigo: 5, nome: 'Esportes', descricao: 'Equipamentos e acessórios esportivos.' },
      { codigo: 6, nome: 'Móveis', descricao: 'Móveis para casa, escritório e decoração.' },
      { codigo: 7, nome: 'Beleza', descricao: 'Produtos de beleza e cuidados pessoais.' },
      { codigo: 8, nome: 'Brinquedos', descricao: 'Brinquedos para crianças de todas as idades.' },
      { codigo: 9, nome: 'Ferramentas', descricao: 'Ferramentas para construção e reparos domésticos.' },
      { codigo: 10, nome: 'Jardinagem', descricao: 'Produtos para jardinagem e cuidado de plantas.' }
    ];

    // Verifica se as categorias já existem antes de tentar inseri-las
    for (let category of categories) {
      const existingCategory = await Categoria.findOne({ where: { codigo: category.codigo } });
      if (!existingCategory) {
        // Se a categoria não existe, insere no banco de dados
        await Categoria.create(category);
        console.log(`Categoria '${category.nome}' inserida com sucesso.`);
      } else {
        console.log(`Categoria '${category.nome}' já existe. Ignorando inserção.`);
      }
    }
  } catch (error) {
    console.error('Erro ao inserir categorias:', error);
  }
}

export default categoriaService;