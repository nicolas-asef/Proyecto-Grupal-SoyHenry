const { Router } = require('express');

// importarme los modelos
const { User } = require('../db.js')


const router = Router();

router.post('/', async (req, res, next) => {
    const {name, lastName, img, email, password, phone, dni, location } = req.body;
    try {
        let user = await User.create({
            name, 
            lastName, 
            img, 
            email, 
            password, 
            phone, 
            dni, 
            location
        })
        res.status(200).send({message: 'El user fue creado correctamente'})
    } catch (error) {
        next(error)
    }
})

module.exports = router