import express from 'express';
import { categoriaService } from '../services/categoria.services.js';

const router = express.Router();

export const categoriaController = (app) => {

    router.get('/', categoriaService.getAll)       // Buscar todos os categorias
        .get('/:id', categoriaService.getById) // Buscar um categoria por ID
        .post('/', categoriaService.create)     // Criar um categoria
        .put('/:id', categoriaService.update)  // Atualizar um categoria
        .delete('/:id', categoriaService.delete); // Excluir um categoria

    // Prefixo global "/api/categorias" para todas as rotas de categorias
    app.use('/api/categorias', router);
}

export default router;
