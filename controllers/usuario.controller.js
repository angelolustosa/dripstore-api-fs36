import express from 'express';
import { usuarioService } from '../services/usuario.service.js';

const router = express.Router();

export const usuarioController = app => {

    router.get('/', usuarioService.getAll)       // Buscar todos os produtos
        .get('/:id', usuarioService.getById) // Buscar um produto por ID
        .post('/', usuarioService.create)     // Criar um produto
        .put('/:id', usuarioService.update)  // Atualizar um produto
        .delete('/:id', usuarioService.delete); // Excluir um produto

    // Prefixo global "/api/produtos" para todas as rotas de produtos
    app.use('/api/usuarios', router);
}

export default router;
