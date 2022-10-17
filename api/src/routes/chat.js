const { Router } = require("express");
const { Chat, Message, User, Worker } = require("../db.js");

const router = Router();

router.get('/', async (req,res,next) => {
    try{
        let inbox = await Chat.findAll({
            include: [
                {model:User, as:"Host"},
                {model: Message}
            ]
        })
        console.log(inbox)
        res.status(200).send(inbox)
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