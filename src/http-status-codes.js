export const StatusCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500
}

export const ReasonPhrases = {
  [StatusCodes.OK]: 'Ok',
  [StatusCodes.CREATED]: 'Created',
  [StatusCodes.ACCEPTED]: 'Accepted',
  [StatusCodes.BAD_REQUEST]: 'Bad Request',
  [StatusCodes.UNAUTHORIZED]: 'Unauthorized',
  [StatusCodes.FORBIDDEN]: 'Foribidden',
  [StatusCodes.NOT_FOUND]: 'Not Found',
  [StatusCodes.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
  [StatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error'
}