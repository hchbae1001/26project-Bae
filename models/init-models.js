var DataTypes = require("sequelize").DataTypes;
var _board = require("./board");
var _push = require("./push");
var _sessions = require("./sessions");
var _user = require("./user");
var _user_profile = require("./user_profile");

function initModels(sequelize) {
  var board = _board(sequelize, DataTypes);
  var push = _push(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_profile = _user_profile(sequelize, DataTypes);

  board.belongsTo(board, { as: "user", foreignKey: "user_id"});
  board.hasMany(board, { as: "boards", foreignKey: "user_id"});
  push.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(push, { as: "pushes", foreignKey: "user_id"});
  user_profile.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_profile, { as: "user_profiles", foreignKey: "user_id"});

  return {
    board,
    push,
    sessions,
    user,
    user_profile,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
