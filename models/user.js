const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    name: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    auth: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    },
    failStack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    new: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
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
    ]
  });
};
