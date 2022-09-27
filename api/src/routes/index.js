const { Router } = require('express');
const  modelJob  = require('./job')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const modelWorker = require('./Worker.js')
// const modelUser = require('./User.js')
// Seguir agregando lo que falte....
const modelUser = require('./users')

const router = Router();

router.use('/jobs', modelJob)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/worker',modelWorker)
// router.use('/user',modelUser)


router.use('/users', modelUser);

module.exports = router;
