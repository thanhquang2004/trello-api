import ApiError from "~/utils/ApiError";
import { env } from "./environment";
import { StatusCodes } from "http-status-codes";
import { WHITELIST_DOMAINS } from "~/utils/constants";

export const corsOptions = {
  origin: function (origin, callback) {
    if (env.BUILD_MODE === "dev") {
      return callback(null, true);
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, "Not allowed by CORS"));
  },

  optionsSuccessStatus: 200,
  credentials: true,
};
