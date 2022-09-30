const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const modelWorker = require('./Worker.js')
// const modelUser = require('./User.js')
// Seguir agregando lo que falte....
const  modelJob  = require('./job')
const modelUser = require('./users')
const modelWorker = require('./worker.js')
const authRoute = require('./auth.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/worker',modelWorker)
// router.use('/user',modelUser)

router.use('/jobs', modelJob)
router.use('/worker', modelWorker)
router.use('/users', modelUser);
router.use('/auth', authRoute)

module.exports = router;
