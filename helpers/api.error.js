class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static badRequest(message) {
    throw new ApiError(400, message);
  }

  static unAuthorized(message) {
    throw new ApiError(401, message);
  }

  static forbidden(message) {
    throw new ApiError(403, message);
  }

  static notFound(message) {
    throw new ApiError(404, message);
  }

  static internal(message) {
    throw new ApiError(500, message);
  }
}

export default ApiError;
