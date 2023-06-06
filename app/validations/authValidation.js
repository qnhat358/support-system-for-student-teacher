const Joi = require('joi');

const registerValidation = Joi.object({
  username: Joi.string().alphanum().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
    'any.required': `Need to enter enough information`,
    'string.alphanum': `This username is Invalid`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
    'any.required': `Need to enter enough information`,
  }),
  type: Joi.string().valid('student', 'teacher').required().messages({
    'string.empty': `Need to enter enough information`,
    'any.only': `Invalid type.`,
  }),
});

const loginValidation = Joi.object({
  username: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
});

module.exports = { registerValidation, loginValidation }