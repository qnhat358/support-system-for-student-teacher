const { UnauthorizedException } = require('../exceptions')
const { httpErrorTransform } = require('../../app/utils/httpCodes')
const authenticateRole = (roleArray) => (req, res, next) => {
  //if user has a role that is required to access any API
  if (!roleArray.includes(req.user.UserType)) {
    return res.responseError(new UnauthorizedException(httpErrorTransform.unauthorized));
  }
  return next();
};
module.exports = authenticateRole;
