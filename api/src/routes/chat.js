const { Router } = require("express");
const { Chat, Message, User, Worker } = require("../db.js");
const {Op} = require("sequelize")

const router = Router();

router.get('/', async (req,res,next) => {
    try{
        let inbox = await Chat.findAll({
            include: [
                {model:User, as:"Host"},
                {model:User, as:"Guest"},
                {model: Message}
            ]
        })

        res.status(200).send(inbox)
    }catch(error){
        res.send('Must be a problem:' + error.message).status(404);
    }
})
router.get('/:id', async (req,res,next) => {
    const { id } = req.params
    try{
        let chathost = await Chat.findAll({
            include: [
                {model:User, as:"Host", where:{ID: id}},
                {model:User, as:"Guest"},
                {model: Message}
            ]
        })
        let chatguest = await Chat.findAll({
            include: [
                {model:User, as:"Host"},
                {model:User, as:"Guest",where:{ID: id}},
                {model: Message}
            ]
        })
        let chats = [...chathost, ...chatguest]

        res.status(200).send(chats)
    }catch(error){
        res.send('Must be a problem:' + error.message).status(404);
    }
})

router.delete('/:id', async (req,res,next) => {
    const {id} = req.params;
    try{
        await Chat.destroy({
            where:{id:id}
        })
        res.status(200).send('the chat has been deleted')
    } catch(error){
        console.log(error)
        next(error)
    }
})

module.exports = router;