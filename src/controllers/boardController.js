import { StatusCodes } from "http-status-codes";
import boardService from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.CREATED)
      .json(await boardService.createNew(req.body));
  } catch (error) {
    next(error);
  }
};

const getDetail = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .json(await boardService.getDetail(req.params.id));
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .json(await boardService.update(req.params.id, req.body));
  } catch (error) {
    next(error);
  }
};

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .json(await boardService.moveCardToDifferentColumn(req.body));
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
  getDetail,
  update,
  moveCardToDifferentColumn,
};
