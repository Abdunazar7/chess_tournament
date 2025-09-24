import Match from "../models/match.model.js";
import ApiError from "../helpers/api.error.js";

export const addMatch = async (req, res, next) => {
  try {
    const newMatch = await Match.create(req.body);
    res.status(201).json({ message: "New match added", data: newMatch });
  } catch (error) {
    next(error);
  }
};

export const getMatches = async (req, res, next) => {
  try {
    const matches = await Match.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: matches });
  } catch (error) {
    next(error);
  }
};

export const getOneMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const match = await Match.findByPk(id);
    if (!match) return next(ApiError.notFound("Match not found"));
    res.status(200).json(match);
  } catch (error) {
    next(error);
  }
};

export const updateMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedMatch]] = await Match.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) return next(ApiError.notFound("Match not found"));
    res.status(200).json({ message: "Match updated", data: updatedMatch });
  } catch (error) {
    next(error);
  }
};

export const deleteMatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Match.destroy({ where: { id } });
    if (!deleted) return next(ApiError.notFound("Match not found"));
    res.status(200).json({ message: "Match deleted" });
  } catch (error) {
    next(error);
  }
};
