const { BadRequestException } = require('../exceptions')
const {httpErrorTransform} = require('../../app/utils/httpCodes')
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { errors: { label: 'key' }, abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return res.responseError(new BadRequestException(httpErrorTransform.bad_request , errorMessage));
    }
    next();
  }
}

module.exports = validate;