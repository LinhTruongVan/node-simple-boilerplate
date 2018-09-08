export const createOkResponse = (res, data) => res.status(200).json({ data });

export const createCreatedResponse = (res, data) => res.status(201).json({ data });

export const createErrorResponse = (res, err) => {
  const { status, message } = err;
  return res.status(status).json({ error: { status, message } });
};

export default {
  createOkResponse,
  createCreatedResponse,
  createErrorResponse
};
