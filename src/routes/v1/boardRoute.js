import express from "express";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validations/boardValidation";

const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.send("GET /board");
  })
  .post(boardValidation.createNew, boardController.createNew);

Router.route("/:id")
  .get(boardController.getDetail)
  .put(boardValidation.update, boardController.update)
  .delete((req, res) => {
    res.send("DELETE /board/:id");
  });

Router.route("/supports/moveCard").put(boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn);

export const boardRoutes = Router;
