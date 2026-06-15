export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error.details);
      }

      res.status(400);
      throw new Error("Invalid request data");
    }

    req.body = value;
    next();
  };
};