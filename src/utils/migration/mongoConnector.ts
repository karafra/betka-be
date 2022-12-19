import { MongoClient } from 'mongodb'

const MONGO_URL = process.env.MONGO_URI;

export const getDb = async () => {
  const client: any = await MongoClient.connect(MONGO_URL, {
    useUnifiedTopology: true,
  });
  return client.db();
};
