import { getDatabase } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validators";
import { ObjectId } from "mongodb";
import { BOARD_TYPES } from "~/utils/constants";
import { columnModel } from "./columnModel";
import { cardModel } from "./cardModel";

const Joi = require("joi");

const BOARD_COLLECTION_NAME = "boards";
const BOARD_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  type: Joi.string().valid(BOARD_TYPES.PRIVATE, BOARD_TYPES.PUBLIC).required(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

const validateBeforeCreate = async (data) => {
  try {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validatedData = await validateBeforeCreate(data);
    return await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .insertOne(validatedData);
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};

const getDetail = async (id) => {
  try {
    const board = await getDatabase()
      .collection(BOARD_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: columnModel.COLUMN_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: cardModel.CARD_COLLECTION_NAME,
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();
    return board[0] || null;
  } catch (error) {
    throw new Error(error);
  }
};

export const boardModel = {
  BOARD_COLLECTION_NAME,
  BOARD_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  getDetail,
};
