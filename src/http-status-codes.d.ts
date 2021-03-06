export declare enum StatusCodes {
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  CREATED = 201,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  OK = 200,
  UNAUTHORIZED = 401,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export declare enum ReasonPhrases {
  [StatusCodes.OK] = 'Ok',
  [StatusCodes.CREATED] = 'Created',
  [StatusCodes.ACCEPTED] = 'Accepted',
  [StatusCodes.BAD_REQUEST] = 'Bad Request',
  [StatusCodes.UNAUTHORIZED] = 'Unauthorized',
  [StatusCodes.FORBIDDEN] = 'Foribidden',
  [StatusCodes.NOT_FOUND] = 'Not Found',
  [StatusCodes.UNPROCESSABLE_ENTITY] = 'Unprocessable Entity',
  [StatusCodes.INTERNAL_SERVER_ERROR] = 'Internal Server Error'
}
