import Joi from "joi";

const questionSchema = Joi.object({
  title: Joi.string().required(),
  question: Joi.string().required(),
});

export default questionSchema;
