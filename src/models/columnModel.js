import Joi from "joi";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "./validators";
import { getDatabase } from "~/config/mongodb";
import { ObjectId } from "mongodb";

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = "columns";
const COLUMN_COLLECTION_SCHEMA = Joi.object({
  boardId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  title: Joi.string().required().min(3).max(50).trim().strict(),

  cardOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});

const INVALID_UPDATE_FIELDS = ["_id", "boardId", "createdAt"];

const validateBeforeCreate = async (data) => {
  try {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, {
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
      .collection(COLUMN_COLLECTION_NAME)
      .insertOne({
        ...validatedData,
        boardId: new ObjectId(validatedData.boardId),
      });
  } catch (error) {
    throw new Error(error);
  }
};

const findOneById = async (id) => {
  try {
    return await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};

const pushCardOrderIds = async (card) => {
  try {
    return await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(card.columnId) },
        { $push: { cardOrderIds: card._id } },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, updateData) => {
  try {
    //Fix bug
    const cardOrderIds = updateData.cardOrderIds;
    cardOrderIds.forEach((id, index) => {
      // console.log("id", id);
      if (!ObjectId.isValid(id)) {
        throw new Error(`Invalid ObjectId at index ${index}: ${id}`);
      }
    });


    Object.keys(updateData).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key];
      }
    });

    if (updateData.cardOrderIds) {
      updateData.cardOrderIds = updateData.cardOrderIds.map(
        (id) => new ObjectId(id)
      );
    }

    return await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...updateData,
          },
        },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};

const deleteOneById = async (id) => {
  try {
    return await getDatabase()
      .collection(COLUMN_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};

export const columnModel = {
  COLUMN_COLLECTION_NAME,
  COLUMN_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  pushCardOrderIds,
  update,
  deleteOneById,
};
