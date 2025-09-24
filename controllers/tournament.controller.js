import Tournament from "../models/tournament.model.js";
import ApiError from "../helpers/api.error.js";

export const addTournament = async (req, res, next) => {
  try {
    const newTournament = await Tournament.create(req.body);
    res.status(201).json({ message: "New tournament added", data: newTournament });
  } catch (error) {
    next(error);
  }
};

export const getTournaments = async (req, res, next) => {
  try {
    const tournaments = await Tournament.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: tournaments });
  } catch (error) {
    next(error);
  }
};

export const getOneTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByPk(id);
    if (!tournament) return next(ApiError.notFound("Tournament not found"));
    res.status(200).json(tournament);
  } catch (error) {
    next(error);
  }
};

export const updateTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedTournament]] = await Tournament.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) return next(ApiError.notFound("Tournament not found"));
    res.status(200).json({ message: "Tournament updated", data: updatedTournament });
  } catch (error) {
    next(error);
  }
};

export const deleteTournament = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Tournament.destroy({ where: { id } });
    if (!deleted) return next(ApiError.notFound("Tournament not found"));
    res.status(200).json({ message: "Tournament deleted" });
  } catch (error) {
    next(error);
  }
};
