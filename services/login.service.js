import authConfig from "../config/auth.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.model.js";
import Papel from "../models/papel.model.js";

export const loginService = {
  cadastrar: async (req, res) => {
    const { nome, cpf, email, senha } = req.body;
    try {
      // Create new user
      const senhaEncriptada = await bcrypt.hash(senha, 10);
      const usuario = await Usuario.create({
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senhaEncriptada,
      });
  
      const papel = await Papel.findOne({ where: { nome: "Usuário" } });
      await usuario.setPapel([papel]); //set[alias no model do relacionamento]
  
      res.status(201).json({ message: "Usuário cadastrado com Sucesso!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    const { nome, cpf, email, senha } = req.body;
    try {
      // Find usuario by username
      const usuario = await Usuario.findOne({
        where: {
          nome: nome,
          cpf: cpf,
        },
      });
  
      if (!usuario) {
        return res.status(404).json({ message: "Usuário(a) não encontrado(a)." });
      }
  
      // Validate password
      const senhaEhInvalida = await bcrypt.compare(senha, usuario.senha);
  
      if (!senhaEhInvalida) {
        return res.status(401).json({
          token: null,
          message: "Senha Inválida!",
        });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: usuario.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });
  
      // Get user roles
      const papeisUsuario = await usuario.getPapeis();
      const papeis = papeisUsuario.map(papel => `${papel.nome.toUpperCase()}`);
  
      res.status(200).json({
        id: id,
        nome: nome,
        email: email,
        papeis: papeis,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}