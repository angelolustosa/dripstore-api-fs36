import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Categoria from './categoria.model.js';

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  avaliacao: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  tamanho: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  },
  cor: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    references: {
      model: Categoria, // Relacionamento com a tabela Categoria
      key: 'id'
    }
  }
}, {
  tableName: 'produto',
  timestamps: false,
  hooks: {
    beforeCreate: (produto, options) => {
      // Validações adicionais antes de criar um produto
    },
    beforeUpdate: (produto, options) => {
      // Validações adicionais antes de atualizar um produto
    }
  }
});

// Definir o relacionamento
Produto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });
Categoria.hasMany(Produto, { foreignKey: 'idCategoria', as: 'produtos' });

export default Produto;
