import Categoria from '../models/categoria.model.js';
import { insertCategories } from '../services/categoria.services.js';
import sequelize from './index.js';

// Função de inicialização do banco de dados
export const iniciarBanco = async () => {
  try {
    // Conecta ao banco de dados
    await sequelize.authenticate();
    console.log('[OK] ✅ Conexão com o Banco de Dados estabelecida com sucesso');

    // Sincroniza as tabelas com o banco de dados (alterando, sem perder dados)
    await sequelize.sync({ force: true, alter: false }); // ⚠️ Isso apaga e recria as tabelas! Use alter: true para atualizar sem perder dados
    console.log('✅ Banco de dados sincronizado!');

    // Verifica se a tabela de categorias tem dados, se não tiver, insere as categorias
    const categoriaCount = await Categoria.count();
    if (categoriaCount === 0) {
      console.log('Banco vazio, inserindo categorias...');
      await insertCategories(); // Chama a função de inserção de categorias
    } else {
      console.log('Banco já contém dados, não é necessário inserir categorias.');
    }
  } catch (error) {
    console.error('[ERRO]: ❌ Não foi possível conectar ou sincronizar o banco de dados:', error);
  }
};