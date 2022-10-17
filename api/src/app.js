const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const socketio = require('socket.io');
const http = require("http");
const e = require('express');
require('./db.js');
const { Op, Worker, Job, Contract, User, Chat, Message, Country,PopUp } = require("./db.js");
const app = express();
const cors = require("cors")


app.name = 'API';

app.use(cors());
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
      origin: "http://localhost:3000",
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

const getSocket = (socketId) => {
  return users.find(user => user.socketId === socketId)
}

io.on("connection", socket => {
  console.log("Se ha conectado un usuario" + socket.id)
  
    socket.on("addUser",async (userId) => {

      await User.update({isOnline:true},{where:{ID:userId}})
      addUser(userId, socket.id)
      const notificaciones = await PopUp.findAll({where:{ReceiverID:userId},include:{model:User,as:"Emiter"}})
      io.emit("getUsers", notificaciones)
    })

    socket.on('messageCreation', async ({id_emisor, id_receptor, texto}) => {

      let receptor = getUser(id_receptor)
        
        
      //Enviar evento con el mensaje a el socket apropiado al receptor
      if (receptor){
       io.to(receptor.socketId).emit("createMessage", texto);
      }
      //Crear mensaje
      const message = await Message.create({
        text:texto,
      })
        message.setEmitter(id_emisor)
        message.setRecibidor(id_receptor)
    
      //    socket.on("sendMessage", ({senderId, receiverId, text}) => {
    //   const user = getUser(receiverId);
    //   io.to(user?.socketId).emit("getMessage", {
    //     senderId,
    //     text
    //   })
    // })

      //Buscar chat que este el receptor y el emisor y si no existe crearlo
      //finorcreate{where : workerID: receptor_id}
      const [chat,created] = await Chat.findOrCreate({
        raw:true,
        where:{[Op.and]:[{[Op.or]: [
        {
        HostID: id_emisor}, {HostID: id_receptor}]},
        {
          [Op.or]: [{GuestID: id_receptor},{GuestID: id_emisor}]
        }
        ]    
        },
      })
      if(created){
        chat.setGuest(id_receptor)
        chat.setHost(id_emisor)
      }
      console.log("------------->",chat)
      //Asociar mensaje al receptor
      //Asociar mensaje al chat
      await message.setChat(chat.id)
    })


    socket.on("enviarNotificacion",async ({receptor_id,emisor_id,tipo})=>{
      //Enviar evento con el mensaje del emisor y el tipo
      const recepcion = getUser(receptor_id)
      
      //Crear notificacion


      const emisor = await User.findByPk(emisor_id)
      const receptor = await User.findByPk(receptor_id)
      const notificacion = await PopUp.create({
        type:tipo,
      })

      //Asociar notificacion al emisor
      await notificacion.setEmiter(emisor_id)

      //Asociar notificacion al receptor
      await notificacion.setReceiver(receptor_id)

      const img = emisor.img
      const nombre_emisor = emisor.name
      const id = notificacion.id
      if(recepcion)
        io.to(recepcion.socketId).emit("obtenerNotificacion",{id,img,nombre_emisor,tipo});
    })
    
    socket.on("seen",async elementos => {
      await PopUp.update({viewed:true},{where:{id:elementos}})
    })


    socket.on("disconnect", async (socket) => {
      
      console.log("Usuario desconectado", socket.id)
      
      const user = getSocket(socket.id)

      removeUser(socket.id)
      if(user?.userId)
      await User.update({isOnline:false},{where:{ID:user.userId}})
      io.emit("getUsers", users)
    })
})

module.exports = server;