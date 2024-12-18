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
  .put((req, res) => {
    res.send("PUT /board/:id");
  })
  .delete((req, res) => {
    res.send("DELETE /board/:id");
  });
export const boardRoutes = Router;
