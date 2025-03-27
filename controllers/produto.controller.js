import express from 'express';
import { produtoService } from '../services/produto.services.js';

const router = express.Router();

export const produtoController = app => {

    router.get('/', produtoService.getAll)       // Buscar todos os produtos
        .get('/:id', produtoService.getById) // Buscar um produto por ID
        .post('/', produtoService.create)     // Criar um produto
        .put('/:id', produtoService.update)  // Atualizar um produto
        .delete('/:id', produtoService.delete); // Excluir um produto

    // Prefixo global "/api/produtos" para todas as rotas de produtos
    app.use('/api/produtos', router);
}

export default router;
