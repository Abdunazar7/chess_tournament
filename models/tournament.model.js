import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Tournament = sequelize.define(
  "tournament",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    type_id: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATEONLY, allowNull: false },
    end_date: { type: DataTypes.DATEONLY, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    rounds: { type: DataTypes.INTEGER, allowNull: false },
  },
  { freezeTableName: true, timestamps: true }
);

export default Tournament;
