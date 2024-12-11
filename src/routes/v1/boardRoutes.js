import express from "express";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.send("GET /board");
  })
  .post(boardValidation.createNew, boardController.createNew);

export const boardRoutes = Router;
