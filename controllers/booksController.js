export class BooksController {
  constructor(bookModel) {
    this.bookModel = bookModel;
  }

  async createBook(req, res) {
    try {
      const { title, author, isbn, publishedYear } = req.body;

      if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
      }

      const newBook = await this.bookModel.create({
        title,
        author,
        isbn: isbn || null,
        publishedYear: publishedYear || null,
        createdAt: new Date(),
      });

      return res.status(201).json(newBook);
    } catch (error) {
      console.error('Error creating book:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getBook(req, res) {
    try {
      const { id } = req.params;
      const book = await this.bookModel.findById(id);

      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }

      return res.status(200).json(book);
    } catch (error) {
      console.error('Error retrieving book:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const { title, author, isbn, publishedYear } = req.body;

      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (author !== undefined) updateData.author = author;
      if (isbn !== undefined) updateData.isbn = isbn;
      if (publishedYear !== undefined) updateData.publishedYear = publishedYear;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      const updatedBook = await this.bookModel.update(id, updateData);

      if (!updatedBook) {
        return res.status(404).json({ error: 'Book not found' });
      }

      return res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.bookModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Book not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting book:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
