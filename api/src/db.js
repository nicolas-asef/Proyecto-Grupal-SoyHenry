require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/jobplatform`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos

modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados, PopUp como propiedades
// Para relacionarlos hacemos un destructuring
const { Admin, Chat, Message, Contract, Job, User, Worker, Country, PopUp } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasMany(Contract);
Contract.belongsTo(User);

Worker.hasMany(Contract);
Contract.belongsTo(Worker);

Country.hasMany(User);
User.belongsTo(Country);

Worker.belongsToMany(Job, { through: "Works_Jobs" });
Job.belongsToMany(Worker, { through: "Works_Jobs" });

User.hasOne(Worker);
Worker.belongsTo(User);

Job.belongsToMany(Worker, { through: "Works_Jobs" });
Worker.belongsToMany(Job, { through: "Works_Jobs" });


User.belongsToMany(Worker, { as: "Favorites", through: "Fav" });
Worker.belongsToMany(User, { as: "Favorites", through: "Fav" });

// User.hasMany(PopUp)


User.hasMany(PopUp, {as: "Emiter"})
PopUp.belongsTo(User,{as:"Emiter"})


// User.hasMany(PopUp,{as:"Receiver"})
User.hasMany(PopUp, {as: "Receiver"})
PopUp.belongsTo(User,{as:"Receiver"})

User.hasMany(Chat, {as:"Host"});
Chat.belongsTo(User, {as:"Host"});

User.hasMany(Chat, {as:"Guest"});
Chat.belongsTo(User, {as:"Guest"});
/* 
Worker.hasMany(Chat);
Chat.belongsTo(Worker); */

User.hasMany(Message, {as:"Emitter"});
Message.belongsTo(User, {as:"Emitter"});

User.hasMany(Message, {as:"Recibidor"});
Message.belongsTo(User, {as:"Recibidor"});

/* Worker.hasMany(Message);
Message.belongsTo(Worker); */

Chat.hasMany(Message);
Message.belongsTo(Chat)



// let probando = async () => {
//   const agregando = await Videogame.create({nombre:'juanchito',descripcion:'alto',rating: 3.2,plataformas: 'Playstation'})
// }

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,
  Op, // para importart la conexión { conn } = require('./db.js');
};

