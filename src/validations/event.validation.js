const Joi = require("joi");

exports.createEventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  output: Joi.string().optional(),
  images: Joi.array().items(
    Joi.object({
      image_url: Joi.string().required(),
      caption: Joi.string().optional(),
    })
  ),
});
