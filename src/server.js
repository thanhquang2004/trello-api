/* eslint-disable no-console */
import express from "express";
import { mapOrder } from "~/utils/sorts.js";
import { connectToDatabase, disconnectDatabase } from "./config/mongodb";
import exitHook from "async-exit-hook";
import { env } from "./config/environment";

const START_SERVER = () => {
  const app = express();

  const hostname = "localhost";

  app.get("/", (req, res) => {
    // Test Absolute import mapOrder
    console.log(
      mapOrder(
        [
          { id: "id-1", name: "One" },
          { id: "id-2", name: "Two" },
          { id: "id-3", name: "Three" },
          { id: "id-4", name: "Four" },
          { id: "id-5", name: "Five" },
        ],
        ["id-5", "id-4", "id-2", "id-3", "id-1"],
        "id"
      )
    );
    res.end("<h1>Hello World!</h1><hr>");
  });

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
