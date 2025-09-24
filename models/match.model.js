import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Match = sequelize.define(
  "match",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    round_id: { type: DataTypes.INTEGER, allowNull: false },
    white_player_id: { type: DataTypes.INTEGER, allowNull: false },
    black_player_id: { type: DataTypes.INTEGER, allowNull: false },
    result: { type: DataTypes.STRING, allowNull: false },
    board_number: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
    pgn: { type: DataTypes.TEXT, allowNull: false },
  },
  { freezeTableName: true, timestamps: true }
);

export default Match;
