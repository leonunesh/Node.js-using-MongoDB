import { ObjectId } from 'mongodb';

export class BookModel {
  constructor(db) {
    this.collection = db.collection('books');
  }

  async create(data) {
    const result = await this.collection.insertOne(data);
    return { _id: result.insertedId, ...data };
  }

  async findById(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(id, data) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    // Fetch and return the updated document
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}
