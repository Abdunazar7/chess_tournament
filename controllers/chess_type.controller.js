import ChessType from "../models/chess_type.model.js";
import ApiError from "../helpers/api.error.js";

export const addChessType = async (req, res, next) => {
  try {
    const newType = await ChessType.create(req.body);
    res.status(201).json({ message: "New chess type added", data: newType });
  } catch (error) {
    next(error);
  }
};

export const getChessTypes = async (req, res, next) => {
  try {
    const types = await ChessType.findAll();
    res.status(200).json({ message: "Successfully retrieved", data: types });
  } catch (error) {
    next(error);
  }
};

export const getOneChessType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const type = await ChessType.findByPk(id);
    if (!type) return next(ApiError.notFound("Chess type not found"));
    res.status(200).json(type);
  } catch (error) {
    next(error);
  }
};

export const updateChessType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows, [updatedType]] = await ChessType.update(req.body, {
      where: { id },
      returning: true,
    });
    if (rows === 0) return next(ApiError.notFound("Chess type not found"));
    res.status(200).json({ message: "Chess type updated", data: updatedType });
  } catch (error) {
    next(error);
  }
};

export const deleteChessType = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ChessType.destroy({ where: { id } });
    if (!deleted) return next(ApiError.notFound("Chess type not found"));
    res.status(200).json({ message: "Chess type deleted" });
  } catch (error) {
    next(error);
  }
};
