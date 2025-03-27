import { Sequelize } from "sequelize";
import sequelize from "../db/index.js";
import Produto from "./produto.model.js";
import Categoria from "./categoria.model.js";
import Papel from "./papel.model.js";
import Usuario from "./usuario.model.js";

const db = {};
 
db.Sequelize = Sequelize;
/* db.sequelize = sequelize;
 
db.user = UserModel(sequelize, Sequelize);
db.role = RoleModel(sequelize, Sequelize); */

/* Produto.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categoria' });
Categoria.hasMany(Produto, { foreignKey: 'idCategoria', as: 'produtos' }); */
 
/* Papel.belongsToMany(Usuario, { through: "usaurio_papel" });
Usuario.belongsToMany(Papel, { through: "usuario_papel", as: "papel" }); */
 
//db.PAPEIS = ["Usuário", "Adminstrador", "Moderador"];
 
export default db;