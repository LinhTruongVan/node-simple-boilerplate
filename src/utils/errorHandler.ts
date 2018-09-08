import { Request, Response } from "express";
import createError from "http-errors";

import logger from "./logger";
import { createErrorResponse } from "./responseFactory";

export const notFoundErrorHandler = (_: Request, res: Response) => createErrorResponse(res, new createError.NotFound());

export const globalErrorHandler = (err: any, _: any, res: Response) => {
  if (err.status) {
    return createErrorResponse(res, err);
  }
  logger.error("500", err);
  return createErrorResponse(res, new createError.InternalServerError("Something went wrong, please try again later"));
};

export default {
  notFoundErrorHandler,
  globalErrorHandler
};
