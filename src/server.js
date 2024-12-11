/* eslint-disable no-console */
import express from "express";
import { mapOrder } from "~/utils/sorts.js";
import { connectToDatabase, disconnectDatabase } from "./config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "./config/environment";
import { APIs } from "./routes/v1";

const START_SERVER = () => {
  const app = express();

  const hostname = "localhost";

  app.use(express.json());

  app.use('/v1', APIs)

  const port = env.PORT;

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://${hostname}:${port}/`);
  });

  exitHook(() => {
    console.log("Server is stopping...");
    disconnectDatabase();
  });
};

(async () => {
  try {
    await connectToDatabase();
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
