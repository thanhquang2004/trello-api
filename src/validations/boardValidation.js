import { StatusCodes } from "http-status-codes";
import Joi from "joi";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict(),
    description: Joi.string().max(30).trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ message: new Error(error).message });
  }
};

export const boardValidation = {
  createNew,
};
