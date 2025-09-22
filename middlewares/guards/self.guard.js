import ApiError from "../../helpers/api.error.js";

export default function selfOrAdminMiddleware(req, res, next) {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      return next();
    }

    if (user.id == id) {
      return next();
    }

    return next(ApiError.forbidden("Access denied. You can only access your own data."));
  } catch (err) {
    next(err);
  }
}
