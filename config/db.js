import { MongoClient, ServerApiVersion } from 'mongodb';

export async function createDbConnection(uri) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  await client.db('admin').command({ ping: 1 });
  console.log('Connected to MongoDB Atlas.');
  
  return client.db('library_db');
}
