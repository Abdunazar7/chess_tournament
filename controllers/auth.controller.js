import Admin from "../models/admin.model.js";
import jwtService from "../services/jwt.service.js";
import bcrypt from "bcrypt";
import config from "config";
import ApiError from "../helpers/api.error.js";

// Admin login
export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return next(ApiError.unAuthorized("Invalid email or password"));
    }

    const isPassMatch = await bcrypt.compare(password, admin.password);
    if (!isPassMatch) {
      return next(ApiError.unAuthorized("Invalid email or password"));
    }

    const payload = {
      id: admin.id,
      role: "admin",
      is_creator: admin.is_creator,
    };

    const tokens = jwtService.generateTokens(payload);

    admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"), // ms
      httpOnly: true,
    });

    res.status(200).json({
      message: "Successfully logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

// Admin logout
export const adminLogout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.badRequest("Token not found"));
    }

    const payload = await jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return next(ApiError.unAuthorized("Invalid token"));
    }

    const admin = await Admin.findByPk(payload.id);
    if (!admin) {
      return next(ApiError.notFound("Admin not found"));
    }

    admin.refresh_token = null;
    await admin.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    next(error);
  }
};

// Refresh token
export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return next(ApiError.badRequest("Token not found"));
    }

    const payload = await jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return next(ApiError.unAuthorized("Invalid or expired token"));
    }

    const admin = await Admin.findByPk(payload.id);
    if (!admin || !admin.refresh_token) {
      return next(ApiError.unAuthorized("Admin not found or logged out"));
    }

    const isMatch = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!isMatch) {
      return next(ApiError.unAuthorized("Invalid refresh token"));
    }

    const newPayload = {
      id: admin.id,
      role: "admin",
      is_creator: admin.is_creator,
    };

    const tokens = jwtService.generateTokens(newPayload);
    admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Refresh token updated",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    next(error);
  }
};
