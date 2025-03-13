import { Sequelize } from 'sequelize';
import sequelize from '../db/index.js';

const Categoria = sequelize.define('Categoria', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  codigo: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  modelName: 'Categoria',
  tableName: 'categorias', // Certifique-se de que o nome da tabela está correto
  timestamps: true // Define se quer usar createdAt e updatedAt
});


export default Categoria;
