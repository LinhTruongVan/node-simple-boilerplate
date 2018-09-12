import { Response } from "express";
import { createOkResponse } from "../utils/responseFactory";

const index = (_: any, res: Response) => createOkResponse(res, { now: new Date() });

export default {
  index
};
