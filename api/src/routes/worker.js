const { Router } = require('express');
const { Worker, Job } = require("../db.js")

const router = Router();

// Funcion consultadora de datos a la DB
const getAllWorkers = async () => {
    const allWorkers = await Worker.findAll({
        include: {
            model: User, Contract, Chat, Job
        }
    })
    const dataWorker = allWorkers?.map((w) => {
        return {
            id: w.User.id,
            name: w.User.name,
            lastName: w.User.lastName,
            img: w.User.img,
            email: w.User.email,
            password: w.User.password,
            phone: w.User.phone,
            dni: w.User.dni, 
            location: w.User.location,
            status: w.User.status,
            id: w.id,            
            certification: w.certification,
            premium: w.prermium,
            description: w.description,
            available: w.available,
            contract: w.Contract,
            chat: w.Chat,
            job: w.Job
        }
    });
    return dataWorker;
};


router.get('/', async (req, res, next) =>{

    try {
        const {name, job} = req.query;
        const workers = await getAllWorkers();  

        if (name !== '' && job !== '') {
            let workerFiltered = await workers.filter(w => (w.User.name.toLowerCase().includes(name.toLowerCase())) && (w.Job.nombre.toLowerCase().includes(job.toLowerCase())))          
            workerFiltered.length > 0 ? res.status(200).send(workerFiltered) : res.status(404).send({message: 'No existe ningun trabajador con esos datos.'})
        } else if (name) {
            let workerByName = await workers.filter(w => w.User.name.toLowerCase().includes(name.toLowerCase()))          
            workerByName.length > 0 ? res.status(200).send(workerByName) : res.status(404).send({message: 'No existe ningun trabajador con ese nombre.'}) 
        } else {
            let workerByJob = await workers.filter(w => w.Job.nombre.toLowerCase().includes(job.toLowerCase()))
            workerByJob.length > 0 ? res.status(200).send(workerByJob) : res.status(404).send({message: 'No existe ningun trabajador para ese oficio en particular.'})  
        }   
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) =>{

    try {
        const { id } = req.params;
        const workers = await getAllWorkers();

        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let worker = workers.find(w => w.id === id)
            if (worker) res.status(200).json(worker)
            else res.status(500).send({message: 'No existe ningun worker con ese id en la base de datos.'}) 

        } else res.status(404).send({message: 'Este id no pertenece a la DB.'})
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {

    try {
        const {certification, premium , description, available, jobs} = req.body;        
        const newWorker = await Worker.create({certification, premium , description, available})
        let jobByDB = await Job.findAll({ where: {name: jobs} })
        newWorker.addJob(jobByDB)
        res.status(200).send({message: 'El trabajador fue creado correctamente'})

    } catch (error) {
        next(error)
    }
})


router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const workers = await getAllWorkers();

        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let worker = workers.find(w => w.id === id)
            if (worker) {
                await Worker.update(req.body, {
                    where: {id: id}
                });
                const updatedWorker = await Worker.findOne({where: {id: id}});
                return res.status(200).json({worker: updatedWorker});                
            } else res.status(500).send({message: 'No existe ningun trabajador con ese id en la DB.'})
        } else res.status(404).send({message: 'Este id no pertenece a la DB.'})
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedWorker = await Worker.destroy({
            where: { id: id }
        });

        if (deletedWorker) {
            return res.status(200).send('Trabajador eliminado de manera exitosa.');
        }
        throw new Error('No se encontro ningun trabajador con ese id.');

    } catch (error) {
        next(error)
    }
})


module.exports = router;