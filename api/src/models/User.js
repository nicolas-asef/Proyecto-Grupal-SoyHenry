const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('User', {
    ID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey: true
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    img:{
      type: DataTypes.STRING,
      allowNull:true,
      defaultValue: 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    },
    phone:{
      type: DataTypes.INTEGER,
      allowNull:true
    },
    dni:{
      type: DataTypes.INTEGER,
      allowNull:true
    },
    // location:{
    //   type:DataTypes.STRING,
    //   allowNull:false
    // },
    status:{
      type:DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },{
    timestamps: false
  }
  );
};
