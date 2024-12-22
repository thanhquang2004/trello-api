import "dotenv/config";

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    PORT: process.env.PORT,
    BUILD_MODE: process.env.BUILD_MODE,
};