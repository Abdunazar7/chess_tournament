import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    full_name: { type: DataTypes.STRING },
    is_creator: { type: DataTypes.BOOLEAN, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false },
    refresh_token: { type: DataTypes.STRING, allowNull: true },
  },
  { freezeTableName: true, timestamps: true }
);

export default Admin;
