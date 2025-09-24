import sequelize from "../config/db.js";
import Admin from "./admin.model.js";
import Player from "./player.model.js";
import Tournament from "./tournament.model.js";
import TournamentPlayer from "./tournament_player.model.js";
import Round from "./round.model.js";
import Match from "./match.model.js";
import ChessType from "./chess_type.model.js";

// 🔗 Associations
Tournament.belongsTo(ChessType, { foreignKey: "type_id" });
ChessType.hasMany(Tournament, { foreignKey: "type_id" });

TournamentPlayer.belongsTo(Player, { foreignKey: "player_id" });
Player.hasMany(TournamentPlayer, { foreignKey: "player_id" });

TournamentPlayer.belongsTo(Tournament, { foreignKey: "tournament_id" });
Tournament.hasMany(TournamentPlayer, { foreignKey: "tournament_id" });

Round.belongsTo(Tournament, { foreignKey: "tournament_id" });
Tournament.hasMany(Round, { foreignKey: "tournament_id" });

Match.belongsTo(Round, { foreignKey: "round_id" });
Round.hasMany(Match, { foreignKey: "round_id" });

Match.belongsTo(TournamentPlayer, {
  as: "whitePlayer",
  foreignKey: "white_player_id",
});
Match.belongsTo(TournamentPlayer, {
  as: "blackPlayer",
  foreignKey: "black_player_id",
});

export {
  sequelize,
  Admin,
  Player,
  Tournament,
  TournamentPlayer,
  Round,
  Match,
  ChessType,
};
