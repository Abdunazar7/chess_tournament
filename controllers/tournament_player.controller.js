import TournamentPlayer from "../models/tournament_player.model.js";
import ApiError from "../helpers/api.error.js";

export const addTournamentPlayer = async (req, res, next) => {
  try {
    const newTP = await TournamentPlayer.create(req.body);
    res.status(201).json({ message: "Tournament player added", data: newTP });
  } catch (error) {
    next(error);
  }
};

export const getTournamentPlayers = async (req, res, next) => {
  try {
    const list = await TournamentPlayer.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: list });
  } catch (error) {
    next(error);
  }
};

export const getOneTournamentPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tp = await TournamentPlayer.findByPk(id);
    if (!tp) return next(ApiError.notFound("Tournament player not found"));
    res.status(200).json(tp);
  } catch (error) {
    next(error);
  }
};

export const updateTournamentPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedTP]] = await TournamentPlayer.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) return next(ApiError.notFound("Tournament player not found"));
    res.status(200).json({ message: "Tournament player updated", data: updatedTP });
  } catch (error) {
    next(error);
  }
};

export const deleteTournamentPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await TournamentPlayer.destroy({ where: { id } });
    if (!deleted) return next(ApiError.notFound("Tournament player not found"));
    res.status(200).json({ message: "Tournament player deleted" });
  } catch (error) {
    next(error);
  }
};
