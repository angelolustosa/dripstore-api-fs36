import { PAPEIS } from "../db/sync.js";
import Usuario from "../models/usuario.model.js";

const verificarDuplicadadeNomeOrCpfOrEmail = async (req, res, next) => {
  const { nome, cpf, email } = req.body;

  try {
    // Check if username exists
    let usuario = await Usuario.findOne({ where: { nome: nome } });
    if (usuario) {
      return res
        .status(400)
        .json({
          message: "AVISO! Nome de usuário já existe. Tente outro nome!",
        });
    }

    // Check if email exists
    usuario = await Usuario.findOne({ where: { cpf: cpf } });
    if (usuario) {
      return res.status(400).json({ message: "ERRO! CPF já existe!" });
    }

    // Check if email exists
    usuario = await Usuario.findOne({ where: { email: email } });
    if (usuario) {
      return res
        .status(400)
        .json({ message: "AVISO! Este email não pode ser utilizado!" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verificaSePapelExiste = (req, res, next) => {
  const { papeis } = req.body;
  if (papeis) {
    for (const papel of papeis) {
      if (!PAPEIS.includes(papel)) {
        return res
          .status(400)
          .json({ message: `Papel não existe: ${papel}` });
      }
    }
  } else {
    return res
    .status(400)
    .json({ message: `Papéis não informados!` });
  }
  next();
};

const verificarCadastro = {
  verificarDuplicadadeNomeOrCpfOrEmail,
  verificaSePapelExiste,
};

export default verificarCadastro;
