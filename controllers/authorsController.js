export class AuthorsController {
  constructor(authorModel) {
    this.authorModel = authorModel;
  }

  async createAuthor(req, res) {
    try {
      const { name, birthYear, nationality, biography } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const newAuthor = await this.authorModel.create({
        name,
        birthYear: birthYear || null,
        nationality: nationality || null,
        biography: biography || null,
        createdAt: new Date(),
      });

      return res.status(201).json(newAuthor);
    } catch (error) {
      console.error('Error creating author:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAuthor(req, res) {
    try {
      const { id } = req.params;
      const author = await this.authorModel.findById(id);

      if (!author) {
        return res.status(404).json({ error: 'Author not found' });
      }

      return res.status(200).json(author);
    } catch (error) {
      console.error('Error retrieving author:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const { name, birthYear, nationality, biography } = req.body;

      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (birthYear !== undefined) updateData.birthYear = birthYear;
      if (nationality !== undefined) updateData.nationality = nationality;
      if (biography !== undefined) updateData.biography = biography;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
      }

      const updatedAuthor = await this.authorModel.update(id, updateData);

      if (!updatedAuthor) {
        return res.status(404).json({ error: 'Author not found' });
      }

      return res.status(200).json(updatedAuthor);
    } catch (error) {
      console.error('Error updating author:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.authorModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Author not found' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting author:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
