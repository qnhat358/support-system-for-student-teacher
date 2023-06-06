const dotenv = require('dotenv').config();
const { httpErrorTransform } = require('../utils/httpCodes')
const httpStatus = require('http-status');
class BadRequestException extends Error {
  constructor(message, errors = []) {
    super(message);
    this.statusCode = httpStatus.BAD_REQUEST;
    this.code = httpStatus[httpStatus.BAD_REQUEST];
    this.errors = errors;
  }
}

class UnauthorizedException extends Error {
  constructor(message, errors = []) {
    super(message);
    this.statusCode = httpStatus.UNAUTHORIZED;
    this.code = httpStatus[httpStatus.UNAUTHORIZED];
    this.errors = errors;
  }
}

class ForbiddenException extends Error {
  constructor(message, errors = []) {
    super(message);
    this.statusCode = httpStatus.FORBIDDEN;
    this.code = httpStatus[httpStatus.FORBIDDEN];
    this.errors = errors;
  }
}

class NotFoundException extends Error {
  constructor(message, errors = []) {
    super(message);
    this.statusCode = httpStatus.NOT_FOUND;
    this.code = httpStatus[httpStatus.NOT_FOUND];
    this.errors = errors;
  }
}

class InternalServerException extends Error {
  constructor(message, errors = []) {
    super(message);
    this.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    this.code = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    this.errors = errors;
  }
}

class CustomException extends Error {
  constructor(message, errors = [], statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.code = httpStatus[statusCode];
  }
}

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

const exceptionHandler = (err, req, res, next) => {
  if (err instanceof BadRequestException ||
    err instanceof UnauthorizedException ||
    err instanceof ForbiddenException ||
    err instanceof NotFoundException ||
    err instanceof InternalServerException ||
    err instanceof CustomException) {
    return responseErrorException(res, err)
  }
  res.status(500).json({ error: 'Something went wrong!' });
};

module.exports = {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  InternalServerException,
  CustomException,
  exceptionHandler,
};