import Categoria from '../models/categoria.model.js';
import Papel from '../models/papel.model.js';
import { insertCategories } from '../services/categoria.services.js';

import sequelize from './index.js';
export const PAPEIS = ["Usuário", "Administrador", "Moderador"];

// Função de inicialização do banco de dados
export const iniciarBanco = async () => {
  try {
    // Conecta ao banco de dados
    await sequelize.authenticate();
    console.log('[OK] ✅ Conexão com o Banco de Dados estabelecida com sucesso');

    // Sincroniza as tabelas com o banco de dados (alterando, sem perder dados)
    await sequelize.sync({ force: true, alter: true }); // ⚠️ Isso apaga e recria as tabelas! Use alter: true para atualizar sem perder dados
    console.log('✅ Banco de dados sincronizado!');

    // Verifica se a tabela de categorias tem dados, se não tiver, insere as categorias
    const categoriaCount = await Categoria.count();
    if (categoriaCount === 0) {
      console.log('Banco vazio, inserindo categorias...');
      await insertCategories(); // Chama a função de inserção de categorias
      await insertPapeis(); // Chama a função de inserção de papeis
    } else {
      console.log('Banco já contém dados, não é necessário inserir categorias.');
    }
  } catch (error) {
    console.error('[ERRO]: ❌ Não foi possível conectar ou sincronizar o banco de dados:', error);
  }
};

export const insertPapeis = async () => {
  try {
    const papeis = [
      { codigo: 1, nome: 'Usuário', codigo: 'USUARIO' },
      { codigo: 2, nome: 'Adminstrador', codigo: 'ADMIN' },
      { codigo: 3, nome: 'Moderador', codigo: 'MODERADOR' }
    ];

    // Verifica se as categorias já existem antes de tentar inseri-las
    for (let papel of papeis) {
      const existePapel = await Papel.findOne({ where: { codigo: papel.codigo } });
      if (!existePapel) {
        // Se o papel não existe, insere no banco de dados
        await Papel.create(papel);
        console.log(`Papel '${papel.nome}' inserida com sucesso.`);
      } else {
        console.log(`Papel '${papel.nome}' já existe. Ignorando inserção.`);
      }
    }
  } catch (error) {
    console.error('Erro ao inserir papéis:', error);
  }
}

/* const initializeRoles = async () => {
  const roles = ['user', 'moderator', 'admin'];
  for (const role of roles) {
    await db.role.findOrCreate({
      where: { name: role }
    });
  }
}; */