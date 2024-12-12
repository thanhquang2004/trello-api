import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Valid data" });
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
