const { Router } = require('express')
const { Contract,User,Worker } = require('../db')


const route = Router()

route.get('/user', async (req, res) => {
    try {
        let {id} = req.query
        const contrato = await Contract.findByPk(id);
        const usuario = await contrato.getUser()
        res.send(usuario)
    } catch (error) {
        res .send("Error en la operacion: "+error.message)
    }
})

route.get('/worker', async (req, res) => {
    try {
        let {id} = req.query
        const contrato = await Contract.findByPk(id);
        console.log(contrato)
        const usuario = await contrato.getWorker({include:User})
        res.send(usuario)
    } catch (error) {
        res .send("Error en la operacion: "+error.message)
    }
})

route.post('/', async (req,res) => {
    
    const {user_id,worker_id,location,date} = req.body
    try {
        const contrato = await Contract.create({
            finished:false,
            rating_U:null,
            rating_W:null,
            location:location,
            date:date,
            comment_U:null,
            comment_W:null,
            confirmed:false
        })
        console.log("---------------->",worker_id)
        contrato.setWorker(worker_id)
        contrato.setUser(user_id)
        res.send(contrato)
    } catch (error) {
        res .send("---------------->Error en la operacion: "+error.message)
    }
})


route.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const {finished, rating_U,rating_W,confirmed,comment_U,comment_W} = req.body;
        const contract = await Contract.findByPk(id);
        finished ? contract.finished = finished : finished
        rating_U ? contract.rating_U = rating_U : rating_U
        rating_W ? contract.rating_W = rating_W : rating_W
        confirmed ? contract.confirmed = confirmed : confirmed
        comment_U ? contract.comment_U = comment_U : comment_U
        comment_W ? contract.comment_W = comment_W : comment_W

        const valor = await contract.save()
        res .status(200)
            .send(valor)
    } catch (error) {
        res .send("Error en la operacion: "+error.message)
            .status(400)
    }
})



module.exports = route