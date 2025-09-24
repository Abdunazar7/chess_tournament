import Round from "../models/round.model.js";
import ApiError from "../helpers/api.error.js";

export const addRound = async (req, res, next) => {
  try {
    const newRound = await Round.create(req.body);
    res.status(201).json({ message: "New round added", data: newRound });
  } catch (error) {
    next(error);
  }
};

export const getRounds = async (req, res, next) => {
  try {
    const rounds = await Round.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: rounds });
  } catch (error) {
    next(error);
  }
};

export const getOneRound = async (req, res, next) => {
  try {
    const { id } = req.params;
    const round = await Round.findByPk(id);
    if (!round) return next(ApiError.notFound("Round not found"));
    res.status(200).json(round);
  } catch (error) {
    next(error);
  }
};

export const updateRound = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedRound]] = await Round.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) return next(ApiError.notFound("Round not found"));
    res.status(200).json({ message: "Round updated", data: updatedRound });
  } catch (error) {
    next(error);
  }
};

export const deleteRound = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Round.destroy({ where: { id } });
    if (!deleted) return next(ApiError.notFound("Round not found"));
    res.status(200).json({ message: "Round deleted" });
  } catch (error) {
    next(error);
  }
};
