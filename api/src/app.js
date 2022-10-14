const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const socketio = require('socket.io');
const http = require("http");
const e = require('express');
require('./db.js');
const { Op, Worker, Job, Contract, User, Chat, Country,PopUp } = require("./db.js");
const app = express();




app.name = 'API';

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/', routes);

// Error catching endware.
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

let users = []

const addUser = (userId, socketId) => {
  if(!users.some(u => u.userId === userId))
    users.push({userId,socketId})
  else{
    
  }
  
}

const removeUser = (socketId) => {
  users = users.filter(u => u.socketId !== socketId)
}

const getUser = (receiverId) => {
  return users.find(user => user.userId === receiverId)
}


io.on("connection", socket => {
  console.log("Se ha conectado un usuario")
  
    socket.on("addUser",async (userId) => {
      
      addUser(userId, socket.id)
      const notificaciones = await PopUp.findAll({where:{ReceiverID:userId},include:{model:User,as:"Emiter"}})
      io.emit("getUsers", notificaciones)
    })

    

    socket.on("enviarNotificacion",async ({receptor_id,emisor_id,tipo})=>{

      const recepcion = getUser(receptor_id)

      const emisor = await User.findByPk(emisor_id)
      const receptor = await User.findByPk(receptor_id)
      const notificacion = await PopUp.create({
        type:tipo,
      })
      await notificacion.setEmiter(emisor_id)
      await notificacion.setReceiver(receptor_id)
      const img = emisor.img
      const nombre_emisor = emisor.name
      if(recepcion)
      io.to(recepcion.socketId).emit("obtenerNotificacion",{img,nombre_emisor,tipo});
    })
    
    socket.on("disconnect", () => {
      console.log("Usuario desconectado")
      removeUser(socket.id)
      io.emit("getUsers", users)
    })
})

module.exports = server;