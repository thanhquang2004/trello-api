import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(30).trim().strict(),
    description: Joi.string().max(30).trim().strict(),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.BAD_REQUEST,
      new Error(error).message
    );
    next(customError);
  }
};

export const boardValidation = {
  createNew,
};
