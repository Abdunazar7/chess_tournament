import ApiError from "../../helpers/api.error.js";

export default function adminMiddleware(req, res, next) {
  const { user } = req;

  if (user && user.role === "admin" && user.is_creator) {
    return next();
  }

  return next(ApiError.forbidden("Access denied. Admin privileges required."));
}
