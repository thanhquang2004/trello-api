import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import ApiError from "~/utils/ApiError";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCoulmn = {
      ...reqBody,
    };

    const createdColumn = await columnModel.createNew(newCoulmn);

    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );

    if (getNewColumn) {
      getNewColumn.cards = [];

      await boardModel.pushColumnOrderIds(getNewColumn);
    }

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

const update = async (id, reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };

    const updatedColumn = await columnModel.update(id, updateData);

    return updatedColumn;
  } catch (error) {
    throw error;
  }
};

const deleteColumn = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const column = await columnModel.findOneById(id);
    if (!column) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
    }
    // Delete Column
    await columnModel.deleteOneById(id);
    // Delete Cards in Column
    await cardModel.deleteManyByColumnId(id);

    // Delete ColumnId from Board
    await boardModel.pullColumnOrderIds(column);

    return { message: "Column and its card are deleted" };
  } catch (error) {
    throw error;
  }
};

export default {
  createNew,
  update,
  deleteColumn,
};
