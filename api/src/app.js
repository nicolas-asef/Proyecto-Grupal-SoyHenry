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

let users = {}

const addUser = (userId, socketId) => {
  users[userId] ? users[userId] = [...users[userId],socketId] : users[userId] = [socketId]
  
}

const removeUser = (socketId) => {
  const asArray = Object.entries(users);
  let filtered = asArray.filter(([key, value]) => (value.includes(socketId)));
  if(filtered.length> 0 && filtered[0].length > 0)
    users[filtered[0][0]] = users[filtered[0][0]].filter(e => e!==socketId)

  // users = users[filtered[0]].filter(e => e!= socketId)
  //users = users.filter(u => u.socketId !== socketId)
}

const getUser = (receiverId) => {
  return users[receiverId]
}

const getSocket = (socketId) => {
  const asArray = Object.entries(users);
  const filtered = asArray.filter(([key, value]) => value.includes(socketId));

  //console.log("---------------------->",filtered)

  return Object.fromEntries(filtered)
}

io.on("connection", socket => {

  console.log("Se ha conectado un usuario", socket.id)

  
    socket.on("addUser",async (userId) => {

      await User.update({isOnline:true},{where:{ID:userId}})
      addUser(userId, socket.id)
      const notificaciones = await PopUp.findAll({where:{ReceiverID:userId},include:{model:User,as:"Emiter"}})
      io.emit("getUserId", notificaciones)
    })

    socket.on('messageCreation', async ({id_emisor, id_receptor, texto, date, redirect = false}) => {
      
      let receptor = getUser(id_receptor)

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
      let emisor = getUser(id_emisor)
      if(redirect){
        emisor.forEach(e => io.to(e).emit("redirect", {id:chat.id}))
      }

        if (texto !== "") {
        
      //Enviar evento con el mensaje a el socket apropiado al receptor
      if (receptor){
        receptor.forEach(e => io.to(e).emit("createMessage", {EmitterID: id_emisor,text:texto,date:date}))
      }
      //Crear mensaje
      const message = await Message.create({
        text:texto,
        date: date
      })
        message.setEmitter(id_emisor)
        message.setRecibidor(id_receptor)
        await message.setChat(chat.id)
    }
    
      //    socket.on("sendMessage", ({senderId, receiverId, text}) => {
    //   const user = getUser(receiverId);
    //   io.to(user?.socketId).emit("getMessage", {
    //     senderId,
    //     text
    //   })
    // })

      //Buscar chat que este el receptor y el emisor y si no existe crearlo
      //finorcreate{where : workerID: receptor_id}
      
      //Asociar mensaje al receptor
      //Asociar mensaje al chat
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
      let id_mensaje = null
      if(tipo === "mensaje"){
        const chat = await Chat.findOne({where:{[Op.and]:[{[Op.or]: [
          {
          HostID: emisor_id}, {HostID: receptor_id}]},
          {
            [Op.or]: [{GuestID: receptor_id},{GuestID: emisor_id}]
          }
          ]    
          },})
          if(chat){
            id_mensaje = chat.id
          }
          console.log(id_mensaje)
      }
      if(recepcion)
        recepcion.forEach(e => io.to(e).emit("obtenerNotificacion",{id,img,nombre_emisor,tipo,id_mensaje}))
    })
    
    socket.on("seen",async elementos => {
      await PopUp.update({viewed:true},{where:{id:elementos}})
    })


    socket.on("disconnect", async () => {
      
      //console.log("Usuario desconectado", socket.id)
      
      const user = getSocket(socket.id)

      const userId = Object.keys(user)[0]
      console.log(userId)
      
      if(userId && users[userId].length === 1){
        console.log("entre->")
      await User.update({isOnline:false},{where:{ID:userId}})
     }
      if(socket.id && users)
        removeUser(socket.id)

      io.emit("getUsers", users)
    })
})

module.exports = server;