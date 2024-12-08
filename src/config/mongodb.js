import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "./environment";

let trelloDatabaseInstance = null;

const clientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: false,
  },
});

export const connectToDatabase = async () => {
    await clientInstance.connect();

    trelloDatabaseInstance = clientInstance.db(env.MONGODB_DB_NAME);
}

export const getDatabase = () => {
    if(!trelloDatabaseInstance) {
        throw new Error('Database not connected!');
    }
    return trelloDatabaseInstance;
}

export const disconnectDatabase = async () => {
    console.log('Disconnecting from database...');
    await clientInstance.close();
    trelloDatabaseInstance = null;
}