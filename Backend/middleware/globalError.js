export const globalError = (err, req, res, next) => {
  res.json({
    error: "error",
    message: err.message,
    code: err.statusCode,
    location: err.location,
    stack: err.stack,
  });
};
