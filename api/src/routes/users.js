const { Router } = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const auth = require("../controllers/authMiddleware");
const {
  Admin,
  Chat,
  Contract,
  Job,
  User,
  Worker,
  Country,
  PopUp,
  Message,
  Op
} = require("../db.js");

const router = Router();

const getUsers = async () => {



  const info = await User.findAll({
    include: [
      { model: Worker, include: [Job, Contract] },
      { model: Contract },
      { model: Chat, as: "Host" },
      {model: Chat, as : "Guest"},
      { model: Message, as: "Emitter" },
      { model: Country },
      { model: Worker , as : "Favorites"},
      { model:PopUp , as : "Emiter"},
      
     
    ],
  });
  
  const dataUser = info?.map((u) => {
    return {
      id: u.ID,
      name: u.name,
      lastName: u.lastName,
      onBoarded: u.onBoarded,
      isOnline: u.isOnline,
      isAdmin: u.isAdmin,
      img: u.img,
      email: u.email,
      password: u.password,
      phone: u.phone,
      dni: u.dni,
      location: u.Country,
      status: u.status,
      Worker: u.Worker,
      Contracts: u.Contracts,
      Chats: u.Chats,
      isDeleted: u.isDeleted,
      Country: u.Country,
      Favorites: u.Favorites,
      address: u.address,
      street: u.street,
      city: u.city,
      coordinates: u.coordinates,
    };
  });
  return dataUser;
};

const filterItems = function (user, name) {
  return user.filter((u) => {
    return u.name.toLowerCase().includes(name.toLowerCase());
  });
};

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  const users = await getUsers();
  try {
    if (!name) {
      res.send(users);
    } else {
      const userName = filterItems(users, name);
      userName.length > 0
        ? res.status(200).send(userName)
        : res.status(404).send({ message: "El usuario no existe" }); // aca deberia mandar
    }
  } catch (error) {
    res.status(500).send("entro al catch");
  }
});

router.put("/:id", async (req, res, next) => {
  const info = req.body;

  const { id } = req.params;
  try {

    const updatedUser = await User.findOne({ where: { ID: id } });
            
    info.deleted ? await updatedUser.removeFavorites(info.deleted) : "lol"   
        
    info.favorites ? await updatedUser.addFavorites(info.favorites) : "lol"

    info.name
      ? await updatedUser.update({
          name: info.name,
        })
      : "no updatie el name";
    info.lastName
      ? await updatedUser.update({
          lastName: info.lastName,
        })
      : "no updatie el lastName";
    info.img
      ? await updatedUser.update({
          img: info.img,

        })
      : "no updatie el img";
    info.phone
      ? await updatedUser.update({
          phone: info.phone,
        })
      : "no updatie el phone";
    info.dni
      ? await updatedUser.update({
          dni: info.dni,
        })
      : "no updatie el dni";
    info.onBoarded
      ? await updatedUser.update({
          onBoarded: info.onBoarded,
        })
      : "no updatie el onBoarded";
    info.isOnline
      ? await updatedUser.update({
          isOnline: info.isOnline,
        })
      : await updatedUser.update({
          isOnline: info.isOnline,
        });
    info.isAdmin
      ? await updatedUser.update({
          isAdmin: info.isAdmin,
        })
      : "no updatie el admin";
    info.countryId
      ? await updatedUser.update({
          countryId: info.countryId,
        })
      : "no updatie el admin";
    info.street
      ? await updatedUser.update({
          street: info.street,
        })
      : "no updatie el admin";
    info.address
      ? await updatedUser.update({
          address: info.address,
        })
      : "no updatie el admin";
    info.city
      ? await updatedUser.update({
          city: info.city,
        })
      : "no updatie el admin";
    info.coordinates
      ? await updatedUser.update({
          coordinates: info.coordinates,
        })
      : "no updatie el admin";
    if (info.location) {
      let countryDb = await Country.findAll({
        where: {
          name: info.location,
        },
      });
      await updatedUser.setCountry(countryDb[0]);
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  const {deleted} = req.query
  const {id} = req.params
  try {
    await User.update ({
      isDeleted : deleted
    },{
      where: {ID: id}
    })
    res.send("cambio")
  } catch (error) {
    res.send(error)

  }
})


router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const users = await getUsers();
  try {
    if (id) {
      let user = users.find((u) => u.id === id);
      if (user) {
    
        const popUps = await PopUp.findAll({where : {ReceiverID:id},include:{model:User,as:"Emiter"}})
        const chats = await Chat.findAll({where : {[Op.or]:[{GuestID:id},{HostID:id}]},include:{model:Message}})
        user.popUps = popUps

        user.chats = chats


        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "no existe el user" });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { ID, email, img } = req.body;
  try {
    let user = await User.create({
      ID,
      email,
      img,
    });

    res.status(200).json(user); // para agarrar el id de usuario al crearlo
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({
      where: { id: id },
    });
    if (deleted) {
      return res.status(200).send("User deleted");
    }
    throw new Error("User not found");
  } catch (error) {
    next();
  }
});

module.exports = router;
