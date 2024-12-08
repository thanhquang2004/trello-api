import "dotenv/config";

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    PORT: process.env.PORT,
};