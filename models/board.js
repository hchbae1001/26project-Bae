const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('board', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_name: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    title: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    text: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      defaultValue: "Text"
    }
  }, {
    sequelize,
    tableName: 'board',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "board_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
