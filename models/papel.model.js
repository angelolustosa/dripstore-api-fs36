import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Papel = sequelize.define('Papel', {
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
      notEmpty: { msg: 'O nome é obrigatório' }
    }
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O código é obrigatório' },
      //len: { args: [5, 5], msg: 'O código deve ter exatamente 5 caracteres' }
    }
  }
}, {
  tableName: 'papel',
  timestamps: true
});

export default Papel;
