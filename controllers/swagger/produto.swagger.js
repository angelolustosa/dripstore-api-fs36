/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API de gerenciamento de produtos
 */

/**
 * @swagger
 * /api/produtos:
 *   get:
 *     summary: Retorna todos os produtos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *               avaliacao:
 *                 type: number
 *                 format: float
 *                 description: Avaliação do produto (0 a 5)
 *               tamanho:
 *                 type: integer
 *                 description: Tamanho do produto
 *               cor:
 *                 type: string
 *                 description: Cor do produto
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *               idCategoria:
 *                 type: integer
 *                 description: ID da categoria do produto
 *           example:
 *             nome: "Adidads"
 *             descricao: "Grand Court 2.0"
 *             avaliacao: 5.0
 *             tamanho: 43
 *             cor: "Branco"
 *             preco: 259.52
 *             idCategoria: 5
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 */

/**
 * @swagger
 * /api/produtos/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso
 *       404:
 *         description: Produto não encontrado
 *   put:
 *     summary: Atualiza um produto existente
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do produto
 *               descricao:
 *                 type: string
 *                 description: Descrição do produto
 *               avaliacao:
 *                 type: number
 *                 format: float
 *                 description: Avaliação do produto (0 a 5)
 *               tamanho:
 *                 type: integer
 *                 description: Tamanho do produto
 *               cor:
 *                 type: string
 *                 description: Cor do produto
 *               preco:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *               idCategoria:
 *                 type: integer
 *                 description: ID da categoria do produto
 *           example:
 *             nome: "Adidas"
 *             descricao: "Grand Court 2.0 - Edição Especial"
 *             avaliacao: 4.8
 *             tamanho: 42
 *             cor: "Preto"
 *             preco: 279.99
 *             idCategoria: 5
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 *   delete:
 *     summary: Remove um produto pelo ID
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
