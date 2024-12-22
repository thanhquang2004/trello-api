import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import slugify from "~/utils/formatter";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createdBoard = await boardModel.createNew(newBoard);

    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);

    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetail = async (id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const board = await boardModel.getDetail(id);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }

    const resBoard = cloneDeep(board);
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter(
        (card) => card.columnId.equals(column._id) 
      );
    });

    delete resBoard.cards;

    return resBoard;
  } catch (error) {
    throw error;
  }
};

export default {
  createNew,
  getDetail,
};
