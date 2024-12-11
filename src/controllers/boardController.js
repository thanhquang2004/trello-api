import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json({ message: "Valid data" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const boardController = {
  createNew,
};
