import { Sequelize } from 'sequelize';
import sequelize from '../db/index.js';
import Categoria from './categoria.model.js';

const Produto = sequelize.define('Produto', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  avaliacao: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  tamanho: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  cor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  idCategoria: {
    type: Sequelize.INTEGER,
    references: {
      model: Categoria, // Relacionamento com a tabela Categoria
      key: 'id'
    }
  }
}, {
  tableName: 'produto',
  //timestamps: false
});

// Definir o relacionamento
Produto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });
Categoria.hasMany(Produto, { foreignKey: 'idCategoria', as: 'produtos' });

export default Produto;
