import { StatusCodes } from "http-status-codes";
import cardService from "~/services/cardService";

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await cardService.createNew(req.body));
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createNew,
};
