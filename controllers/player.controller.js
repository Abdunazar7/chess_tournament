import Player from "../models/player.model.js";
import ApiError from "../helpers/api.error.js";

// Create
export const addPlayer = async (req, res, next) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.status(201).json({ message: "New player added", data: newPlayer });
  } catch (error) {
    next(error);
  }
};

// Get all
export const getPlayers = async (req, res, next) => {
  try {
    const players = await Player.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: players });
  } catch (error) {
    next(error);
  }
};

// Get one
export const getOnePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await Player.findByPk(id);
    if (!player) return next(ApiError.notFound("Player not found"));
    res.status(200).json(player);
  } catch (error) {
    next(error);
  }
};

// Update
export const updatePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedPlayer]] = await Player.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) return next(ApiError.notFound("Player not found"));
    res
      .status(200)
      .json({ message: "Player data updated", data: updatedPlayer });
  } catch (error) {
    next(error);
  }
};

// Delete
export const deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Player.destroy({ where: { id } });
    if (!deleted) return next(ApiError.notFound("Player not found"));
    res.status(200).json({ message: "Player deleted" });
  } catch (error) {
    next(error);
  }
};
