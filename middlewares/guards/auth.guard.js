import jwtService from "../../services/jwt.service.js";
import ApiError from "../../helpers/api.error.js";

export default async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw ApiError.badRequest("Header not found");
    }

    console.log(authHeader);
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw ApiError.badRequest("Token not found");
    }

    const decodedPayload = await jwtService.verifyAccessToken(token);

    if (!decodedPayload) {
      throw ApiError.badRequest("Payload not found");
    }

    req.user = decodedPayload;
    next();
  } catch (err) {
    next(err);
  }
}
