const { Router } = require("express");
const { Op, Worker, Job, Contract, User, Chat, Country } = require("../db.js");

const router = Router();

// Funcion consultadora de datos a la DB

router.get("/", async (req, res, next) => {
  try {
    // const creacionJob = await Job.create({name:"Ingeniero"})
    // await Job.create({name:"Zapatero"})
    // await Job.create({name:"Zarp"})
    // const creacionWorker = await Worker.create({description:"hola"})
    // const creacionUser = await User.create({name:"Inge niero",lastName:"Gonzales",email:"gonza",password:32,location:"San Luis"})
    // const creacionContract = await Contract.create({finished:false,confirmed:false})
    // creacionWorker.addJob(creacionJob.id)
    //creacionWorker.setUser(creacionUser)
    // creacionWorker.addContract(creacionContract.id)
    // creacionUser.addContract(creacionContract.id)
    let { name, job } = req.query;
    if (!job) job = "";
    if (!name) name = "";
    //Detalle, si no se tiene un job o un usuario el worker, el findall no los trae, estos son campos
    //obligatorios
    let workers = await Worker.findAll({
      include: [
        {
          model: Job,
          where: {
            name: {
              [Op.iLike]: `%${job}%`,
            },
          },
        },
        {
          model: User,
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          include: [{ model: Country }],
        },
        Contract,
        { model: User , as : "Favorites"}
      ],
    });

    res.status(200).send(workers);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    let worker = await Worker.findAll({
      where: {
        ID: id,
      },
      include: [Job, User, Contract, Chat],
    });
    if (worker.length < 1) throw new Error("El id es invalido");
    res.status(200).send(worker[0]);
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});
// 
router.post("/", async (req, res) => {
  try {
    const { certification, description, jobs, user_id } = req.body;
    const worker = await Worker.create({
        certification: certification, 
        description:description,
    })
    for (let job = 0; job < jobs.length; job++) {
      const element = jobs[job];
      const seleccionado = await Job.findAll({ where: { name: element } });
      worker.addJob(seleccionado);
    }

    worker.setUser(user_id)
    res.status(201).send(worker)

} catch (error) {
    res .send("Error en la operacion: "+error.message)
            .status(400)
}

} )

// router.put('/:id', async (req, res, next) =>{ 
//     const { id } = req.params;
//     const { certification , description, jobs } = req.body;
//     try {
        
//     } catch (error) {
//         res.status(500).send("entro al catch") 
//     }
// })
 router.put('/:id', async (req, res, next) => {   
     const { id } = req.params;
     const info = req.body; 

     try {
        const worker = await Worker.findOne({where: {ID: id}})
      
        info.premium ? await worker.update({
            premium: true
        }) : "no premium"
          info.certification ? await worker.update({
              certification: info.certification
          }) : "no updatie el certification"
          info.description ? await worker.update({
              description: info.description
          }) : console.log("no updatie el description") 
          if(info.jobs){
                const nuevos_jobs = [] //En jobs se deben pasar todos los jobs actuales y agregados, porque asi se pueden tambien
                //eliminar estos jobs
                for (let job = 0; job < info.jobs.length; job++) {
                    const element = info.jobs[job];
                    const seleccionado = await Job.findOne({where:{name:element}})
                    nuevos_jobs.push( seleccionado)
                }
                worker.setJobs(nuevos_jobs)
            }
        //   if(jobs){
        //       await worker.setJobs(jobs)
        //   }
        //   jobs ? await worker.update({
        //     Jobs: jobs
        //   }) : "hola"
        //   const w = await worker.update({
        //       certification: certification,
        //       description: description
        //        premium: premium,
        //        available: available
        //   })
        //    worker.set({
        //        certification: certification,
        //        description: description
        //    })
        //   await w.addJob(jobs)
        //  const valor = await w.save()
        //const h = await worker.save()
         res.status(200).send("anda")      
     } catch (error) {
         res.status(500).send("entro al catch")        
     }
 })
// router.put('/:id', async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const {certification, description, jobs, premium, available} = req.body;
//         const worker = await Worker.findByPk(id);
//         certification ? worker.certification = certification : certification
//         description ? worker.description = description : description
//         premium ? worker.premium = true : false
//         available ? worker.available = available : available
        
//         if(jobs){
//             const nuevos_jobs = [] //En jobs se deben pasar todos los jobs actuales y agregados, porque asi se pueden tambien
//             //eliminar estos jobs
//             for (let job = 0; job < jobs.length; job++) {
//                 const element = jobs[job];
//                 const seleccionado = await Job.findOne({where:{name:element}})
//                 nuevos_jobs.push( seleccionado)
//             }
//             worker.setJobs(nuevos_jobs)
//         }
//         const valor = await worker.save()
//         res .status(200)
//             .send(valor)
//     } catch (error) {
//         res .send("Error en la operacion: "+error.message)
//             .status(400)
//     }
// })



//El delete tiene que ser logico, por lo que solamente se cambiar un campo dentro de la instancia
//El campo de la instancia se llamaria "deleted(booleano)"
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedWorker = await Worker.destroy({
      where: { id: id },
    });

    if (deletedWorker) {
      return res.status(200).send("Trabajador eliminado de manera exitosa.");
    }
    throw new Error("No se encontro ningun trabajador con ese id.");
  } catch (error) {
    res.send("Error en la operacion: " + error.message).status(400);
  }
});

module.exports = router;
