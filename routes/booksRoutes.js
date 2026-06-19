import express from 'express';

export function createBooksRouter(booksController) {
  const router = express.Router();

  router.post('/', (req, res) => booksController.createBook(req, res));
  router.get('/:id', (req, res) => booksController.getBook(req, res));
  router.patch('/:id', (req, res) => booksController.updateBook(req, res));
  router.delete('/:id', (req, res) => booksController.deleteBook(req, res));

  return router;
}
