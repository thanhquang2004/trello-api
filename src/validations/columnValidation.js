import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/models/validators";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(30).trim().strict(),
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

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    // boardId: Joi.string()
    //   .required()
    //   .pattern(OBJECT_ID_RULE)
    //   .message(OBJECT_ID_RULE_MESSAGE),
    cardOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),
  });

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    next();
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.BAD_REQUEST,
      new Error(error).message
    );
    next(customError);
  }
};

const deleteColumn = async (req, res, next) => {
  const correctCondition = Joi.object({
    id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });

  try {
    await correctCondition.validateAsync(req.params);

    next();
  } catch (error) {
    const customError = new ApiError(
      StatusCodes.BAD_REQUEST,
      new Error(error).message
    );
    next(customError);
  }
};

export const columnValidation = {
  createNew,
  update,
  deleteColumn,
};
