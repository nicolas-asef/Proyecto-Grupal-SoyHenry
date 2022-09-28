const { Router } = require('express');
const  modelJob  = require('./job')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const modelUser = require('./User.js')
// Seguir agregando lo que falte....
const modelWorker = require('./worker.js')
const modelUser = require('./users')

const router = Router();

router.use('/jobs', modelJob)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/user',modelUser)


router.use('/worker',modelWorker)
router.use('/users', modelUser);

module.exports = router;
