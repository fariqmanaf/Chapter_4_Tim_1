const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateModel = async (req, res, next) => {
  const validateBody = z.object({
    model: z.string(),
    type: z.string(),
  });

  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  next();
};
