import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const TournamentPlayer = sequelize.define(
  "tournament_player",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tournament_id: { type: DataTypes.INTEGER, allowNull: false },
    player_id: { type: DataTypes.INTEGER, allowNull: false },
    current_score: { type: DataTypes.INTEGER, allowNull: false },
    rank: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { freezeTableName: true, timestamps: false }
);

export default TournamentPlayer;
