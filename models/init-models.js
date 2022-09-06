var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _comment = require("./comment");
var _sessions = require("./sessions");
var _user = require("./user");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  comment.belongsTo(board, { as: "board", foreignKey: "board_id"});
  board.hasMany(comment, { as: "comments", foreignKey: "board_id"});

  return {
    board,
    comment,
    sessions,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
