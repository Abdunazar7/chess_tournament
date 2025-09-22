import ApiError from "../../helpers/api.error.js";

export default function checkRoles(...allowedRoles) {
  return (req, res, next) => {
    const { user } = req;

    if (user && allowedRoles.includes(user.role)) {
      return next();
    }

    return next(ApiError.forbidden("Access denied. Insufficient permissions."));
  };
}
