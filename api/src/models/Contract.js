const { DataTypes, DATEONLY } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Contract",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      rating_U: {
        type: DataTypes.FLOAT,
      },
      rating_W: {
        type: DataTypes.FLOAT,
      },
      location: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      comment_U: {
        type: DataTypes.STRING,
      },
      comment_W: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: false,
    }
  );
};
