const Joi = require("joi");

const createExamValidation = Joi.object({
  grade: Joi.number().required(),
  topic: Joi.string().allow("").required(),
  name: Joi.string().required(),
  duration: Joi.string().required(),
  visibility: Joi.string().valid("public", "private").required(),
  date: Joi.when("visibility", {
    is: "private",
    then: Joi.date().required(),
    otherwise: Joi.date().allow(""),
  }),
  start: Joi.when("visibility", {
    is: "private",
    then: Joi.string().required(),
    otherwise: Joi.string().allow(""),
  }),
  end: Joi.when("visibility", {
    is: "private",
    then: Joi.string().required(),
    otherwise: Joi.string().allow(""),
  }),
  totalPoint: Joi.number().required(),
  questions: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required(),
        point: Joi.string().required(),
        content: Joi.string().required(),
        answers: Joi.array()
          .items(
            Joi.object({
              content: Joi.string().required(),
              isCorrect: Joi.boolean().required(),
            })
          )
          .required(),
      })
    )
    .required(),
});

const updateExamValidation = Joi.object({
  id: Joi.number().required(),
  grade: Joi.number().required(),
  topic: Joi.string().allow("").required(),
  name: Joi.string().required(),
  duration: Joi.string().required(),
  visibility: Joi.string().valid("public", "private").required(),
  date: Joi.when("visibility", {
    is: "private",
    then: Joi.date().required(),
    otherwise: Joi.date().allow(""),
  }),
  start: Joi.when("visibility", {
    is: "private",
    then: Joi.string().required(),
    otherwise: Joi.string().allow(""),
  }),
  end: Joi.when("visibility", {
    is: "private",
    then: Joi.string().required(),
    otherwise: Joi.string().allow(""),
  }),
  totalPoint: Joi.number().required(),
  // questions: Joi.array()
  //   .items(
  //     Joi.object({
  //       type: Joi.string().required(),
  //       point: Joi.string().required(),
  //       content: Joi.string().required(),
  //       answers: Joi.array()
  //         .items(
  //           Joi.object({
  //             content: Joi.string().required(),
  //             isCorrect: Joi.boolean().required(),
  //           })
  //         )
  //         .required(),
  //     })
  //   )
  //   .required(),
});

module.exports = { createExamValidation, updateExamValidation };
