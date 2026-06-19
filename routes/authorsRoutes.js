import express from 'express';

export function createAuthorsRouter(authorsController) {
  const router = express.Router();

  router.post('/', (req, res) => authorsController.createAuthor(req, res));
  router.get('/:id', (req, res) => authorsController.getAuthor(req, res));
  router.patch('/:id', (req, res) => authorsController.updateAuthor(req, res));
  router.delete('/:id', (req, res) => authorsController.deleteAuthor(req, res));

  return router;
}
