import ApiError from "../../helpers/api.error.js";
import { MobileAppService } from "../../models/index.models.js";

export default async function ownershipMiddleware(req, res, next) {
  try {
    const { user } = req;
    const { id } = req.params;

    if (user.role === "admin") {
      return next();
    }

    const service = await MobileAppService.findByPk(id);
    if (!service) {
      throw ApiError.notFound("Service not found");
    }

    if (service.owner_id !== user.id) {
      throw ApiError.notFound("Provider not found");
    }

    next();
  } catch (err) {
    next(err);
  }
}
