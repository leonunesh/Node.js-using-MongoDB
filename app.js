import express from 'express';
import { createDbConnection } from './config/db.js';
import { BookModel } from './models/booksModel.js';
import { BooksController } from './controllers/booksController.js';
import { createBooksRouter } from './routes/booksRoutes.js';
import { AuthorModel } from './models/authorsModel.js';
import { AuthorsController } from './controllers/authorsController.js';
import { createAuthorsRouter } from './routes/authorsRoutes.js';

async function run() {
  const app = express();
  const PORT = 3000;
  const uri = 'mongodb://leonardohostins:LlJj99419646*@ac-yeplson-shard-00-00.ctdfb6d.mongodb.net:27017,ac-yeplson-shard-00-01.ctdfb6d.mongodb.net:27017,ac-yeplson-shard-00-02.ctdfb6d.mongodb.net:27017/?ssl=true&replicaSet=atlas-h00mv1-shard-0&authSource=admin&appName=myCluster1';

  try {
    // Create database connection
    const db = await createDbConnection(uri);

    // Initialize models
    const bookModel = new BookModel(db);
    const authorModel = new AuthorModel(db);

    // Initialize controllers
    const booksController = new BooksController(bookModel);
    const authorsController = new AuthorsController(authorModel);

    // Initialize routes
    const booksRouter = createBooksRouter(booksController);
    const authorsRouter = createAuthorsRouter(authorsController);

    // Middleware
    app.use(express.json());

    // Routes
    app.use('/books', booksRouter);
    app.use('/authors', authorsRouter);

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'API is running' });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Critical server boot failure:', error);
    process.exit(1);
  }
}

run();
