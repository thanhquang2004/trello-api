import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoutes } from "./boardRoute";
import { cardRoute } from "./cardRoute";
import { columnRoute } from "./columnRoute";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ status: "OK" });
});

Router.use("/boards", boardRoutes);

Router.use("/columns", columnRoute);

Router.use("/cards", cardRoute);

export const APIs = Router;
