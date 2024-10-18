const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

const validateGetCars = async (req, res, next) => {
  const validateQuery = z.object({
    manufacture: z.string().optional()
  });

  const resultValidateQuery = validateQuery.safeParse(req.query);
  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

const validateGetCarById = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

const validateCreateCar = async (req, res, next) => {
  req.body = {
    ...req.body,
    rentPerDay: parseInt(req.body.rentPerDay),
    capacity: parseInt(req.body.capacity),
    available: req.body.available == "true" ? true : false,
    year: parseInt(req.body.year),
    manufacture_id: parseInt(req.body.manufacture_id),

    // Ensure option_details_id is an array before mapping
    option_details_id: Array.isArray(req.body.option_details_id)
      ? req.body.option_details_id.map((id) => parseInt(id))
      : [parseInt(req.body.option_details_id)],

    // Ensure spec_details_id is an array before mapping
    spec_details_id: Array.isArray(req.body.spec_details_id)
      ? req.body.spec_details_id.map((id) => parseInt(id))
      : [parseInt(req.body.spec_details_id)],
  };

  // Body validation schema
  const validateBody = z.object({
    plate: z.string(),
    manufacture_id: z.number(),
    model: z.string(),
    rentPerDay: z.number().positive(),
    capacity: z.number().int().positive(),
    description: z.string(),
    availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number().int().positive(),
    option_details_id: z.array(z.number().positive()),
    spec_details_id: z.array(z.number().positive()),
  });

  // File validation schema (for image)
  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  // Validate the body
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    return res.status(400).json({ errors: resultValidateBody.error.errors });
  }

  // Validate the files
  const resultValidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultValidateFileBody.success) {
    return res
      .status(400)
      .json({ errors: resultValidateFileBody.error.errors });
  }

  // Proceed to the next middleware or controller
  next();
};


const validateUpdateCar = async (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const parsedBody = {
    ...req.body,
    rentPerDay: parseInt(req.body.rentPerDay),
    capacity: parseInt(req.body.capacity),
    available: req.body.available == "true" ? true : false,
    year: parseInt(req.body.year),
  };

  const validateBody = z.object({
    plate: z.string(),
    manufacture: z.string(),
    model: z.string(),
    rentPerDay: z.number().positive(),
    capacity: z.number().int().positive(),
    description: z.string(),
    availableAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid date format",
    }),
    transmission: z.string(),
    available: z.boolean(),
    type: z.string(),
    year: z.number().int().positive(),
    options: z.array(z.string()).nonempty(),
    specs: z.array(z.string()).nonempty(),
  });

  const validateFileBody = z
    .object({
      image: z
        .object({
          name: z.string(),
          data: z.any(),
        })
        .nullable()
        .optional(),
    })
    .nullable()
    .optional();

  const resultValidateBody = validateBody.safeParse(parsedBody);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }

  const resultValidateFileBody = validateFileBody.safeParse(req.files);
  if (!resultValidateFileBody.success) {
    throw new BadRequestError(resultValidateFileBody.error.errors);
  }

  next();
};

const validateDeleteCar = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const resultValidateParams = validateParams.safeParse(req.params);
  if (!resultValidateParams.success) {
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  next();
};

module.exports = {
  validateGetCars,
  validateGetCarById,
  validateCreateCar,
  validateUpdateCar,
  validateDeleteCar,
};
