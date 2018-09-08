import { Response } from "express";
export const createOkResponse = (res: Response, data: any) => res.status(200).json({ data });

export const createCreatedResponse = (res: Response, data: any) => res.status(201).json({ data });

export const createErrorResponse = (res: Response, err: any) => {
  const { status, message } = err;
  return res.status(status).json({ error: { status, message } });
};

export default {
  createOkResponse,
  createCreatedResponse,
  createErrorResponse
};
