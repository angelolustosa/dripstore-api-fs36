import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";
import Usuario from "../models/usuario.model.js";


const verificarToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token não informado!" });
  }

  const tokenAtual = token.startsWith("Bearer ")
    ? token.slice(7, token.length)
    : token;

  jwt.verify(tokenAtual, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.idUsuario = decoded.id;
    next();
  });
};

const possuiPapel = (listaPapeis) => async (req, res, next) => {
    try {
      const usuario = await Usuario.findByPk(req.idUsuario);
      if (!usuario) return res.status(404).json({ message: "Usuário não encontrado" });
  
      const papeis = await usuario.getRoles();
      const usuariosPapel = papeis.map(papel => papel.nome);
  
      if (listaPapeis.some(role => usuariosPapel.includes(role))) {
        return next();
      }
  
      return res.status(403).json({ message: `Papel ${listaPapeis.join(" , ")} obrigatório!` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

/* const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.idUsuario);
    const roles = await user.getRoles();

    for (const role of roles) {
      if (role.name === "admin") {
        return next();
      }
    }

    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.idUsuario);
    const roles = await user.getRoles();

    for (const role of roles) {
      if (role.name === "moderator") {
        return next();
      }
    }

    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.idUsuario);
    const roles = await user.getRoles();

    for (const role of roles) {
      if (role.name === "moderator" || role.name === "admin") {
        return next();
      }
    }

    return res
      .status(403)
      .json({ message: "Require Moderator or Admin Role!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */

const loginJwt = {
  verificarToken,
  possuiPapel
  /* isAdmin,
  isModerator,
  isModeratorOrAdmin, */
};

export default loginJwt;

/* import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.JWT_SECRET;

export default (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Acesso negado' });

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), secret);
    req.usuario = decoded;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido' });
  }
};
 */
