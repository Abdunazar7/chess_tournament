import Admin from "../models/admin.model.js";
import jwtService from "../services/jwt.service.js";
import bcrypt from "bcrypt";
import config from "config";

// ✅ Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPassMatch = await bcrypt.compare(password, admin.password);
    if (!isPassMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: admin.id,
      role: "admin",
      is_creator: admin.is_creator,
    };

    const tokens = jwtService.generateTokens(payload);

    // refresh token hashed holda DB da saqlanadi
    admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await admin.save();

    // cookie orqali clientga yuboriladi
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: config.get("cookie_refresh_token_time"), // ms
      httpOnly: true,
    });

    res.status(200).json({
      message: "Successfully logged in",
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Admin logout
export const adminLogout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token not found" });
    }

    const payload = await jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const admin = await Admin.findByPk(payload.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // refresh tokenni DBdan tozalash
    admin.refresh_token = null;
    await admin.save();

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Successfully logged out" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Refresh token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "Token not found" });
    }

    const payload = await jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const admin = await Admin.findByPk(payload.id);
    if (!admin || !admin.refresh_token) {
      return res.status(401).json({ message: "Admin not found or logged out" });
    }

    const isMatch = await bcrypt.compare(refreshToken, admin.refresh_token);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid refresh token" });
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
    console.error("Refresh token error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
