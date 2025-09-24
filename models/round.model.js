import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Round = sequelize.define(
  "round",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tournament_id: { type: DataTypes.INTEGER, allowNull: false },
    round_number: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.INTEGER, allowNull: false },
    start_time: { type: DataTypes.DATE, allowNull: false },
    end_time: { type: DataTypes.DATE, allowNull: false },
  },
  { freezeTableName: true, timestamps: true }
);

export default Round;
