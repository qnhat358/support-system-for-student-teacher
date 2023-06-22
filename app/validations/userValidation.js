const Joi = require("joi");

const updateUserInfoValidation = Joi.object({
  fullname: Joi.string().min(6).max(50).required().messages({
    "string.empty": `Need to enter enough information`,
    "string.max": `Fullname Characters whose length exceeds 50`,
    "string.min": ` characters less than 6`,
    "string.required": `Need to enter enough information`,
  }),
  phone: Joi.number()
    .integer()
    .min(100000000)
    .max(9999999999)
    .required()
    .messages({
      "number.base": `Phone number must be a number`,
      "number.empty": `Need to enter enough information`,
      "number.max": `Phone number must be less than or equal to 10 digits`,
      "number.min": `Phone number must be at least 9 digits`,
      "any.required": `Need to enter enough information`,
    }),
  birthday: Joi.date().iso("YYYY-MM-DD").required().messages({
    "date.base": `Invalid date format`,
    "date.format": `Invalid date format`,
    "any.required": `Need to enter enough information`,
  }),
  avatar_url: Joi.string().uri().allow("").optional().messages({
    "string.base": `Avatar URL must be a string`,
    "string.uri": `Invalid avatar URL format`,
  }),
});

module.exports = { updateUserInfoValidation };
