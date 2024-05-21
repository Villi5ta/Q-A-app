const validateData = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "Bad data inputted" });
    } else {
      next();
    }
  };
};

export default validateData;
