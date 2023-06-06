const { BadRequestException, UnauthorizedException, ForbiddenException, NotFoundException, InternalServerException, CustomException } = require('../exceptions')

const responseErrorException = (res, err) => {
  let { message, statusCode, code, errors } = err;
  if (process.env.NODE_ENV === 'production') {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    code = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    message = httpErrorTransform.internal_server_error;
  }
  return res.status(statusCode).json({
    'status': false,
    'code': code,
    'message': message,
    'errors': errors,
  });
};

const handleResponse = (req, res, next) => {
  // Success response
  res.responseSuccess = function (data, message = "Successful") {
    return res.status(200).json({
      success: true,
      message: message,
      data: data
    });
  };

  // Error response
  res.responseError = function (error, statusCode = 400) {
    if (error instanceof BadRequestException ||
      error instanceof UnauthorizedException ||
      error instanceof ForbiddenException ||
      error instanceof NotFoundException ||
      error instanceof InternalServerException ||
      error instanceof CustomException) {
      return responseErrorException(res, error)
    }
    return res.status(500).json({ error: 'Something went wrong!' });
  };

  next();
}

module.exports = handleResponse;