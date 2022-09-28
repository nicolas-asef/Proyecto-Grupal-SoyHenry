const { Router } = require('express')
const { Job } = require('../db')


const route = Router()

route.get('/', async (req, res) => {
    try {
        const jobs = await Job.findAll();
        console.log(jobs)
        res.send(jobs)
    } catch (error) {
        res.send (error)
    }
})

route.post('/', async (req,res) => {
    
    const {nombre} = req.body
    console.log(nombre)
    try {
        console.log(Job)
        const job = await Job.create({
            nombre: nombre
        })
        res.send(job)
    } catch (error) {
        res.send(error)
    }
})

module.exports = route