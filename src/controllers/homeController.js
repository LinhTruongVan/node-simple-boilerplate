import { createOkResponse } from '../utils/responseFactory';

export const index = (req, res) => createOkResponse(res, { now: new Date() });

export default {
  index
};
