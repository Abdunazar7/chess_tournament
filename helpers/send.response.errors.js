export const sendErrorResponse = (error, res, status) => {
  console.error(error);
  res.status(status).send({
    message: "Error occurred",
    error: error.message,
  });
};
