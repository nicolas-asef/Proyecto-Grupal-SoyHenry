import React from 'react'
import s from './FormOpinion.module.css'
import { Button, Rating, TextField, Typography } from '@mui/material'
import { modifyContract } from '../../redux/actions/actions'



function FormOpinion({handler,id,closeCB,worker}) {

    // const { user: { sub } } = useAuth0();


    const[controled,setControled] = React.useState(true)

    const [input,setInput] = React.useState({
        contractID : id,
        rating: 0,
        description : ""
    })

    React.useEffect(() => {
        if(input.rating > 0 && input.description != "")
            setControled(false)
    },[input])

    const handeInputChange = function(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        
        let comentario = "comment_U"
        let rating = "rating_U"
        if(worker){
            comentario = "comment_W"
            rating = "rating_W"
        }
        modifyContract({[comentario]:input.description,[rating]:+input.rating},id)
        handler()
    }

  return (
    <form onSubmit={handleSubmit} className={s.contract}>
        <h1 className={s.titleForm}>Califica al usuario</h1>
        <div className={s.textFieldContainer}>
        {/* <Typography component="legend"><p>Califica al usuario</p></Typography> */}
        <Rating
            label = 'hola'
            name="rating"
            sx={{fontSize:'600%',marginTop:'1vh'}}
            precision={0.5}
            value={input.rating}
            fullWidth
            onChange={handeInputChange}
        />
          <TextField 
            label="Deja tu comentario"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
            className={s.inputField}
            required
            name='description'
            onChange={handeInputChange}
          />
        </div>
        <div className={s.submitCloseButtons}>
          <Button
            variant="contained"
            fullWidth
            type='submit'
            disabled = {controled}
          >
            Puntuar
          </Button>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={closeCB}
            
          >
            Salir
          </Button>
        </div>
       {/*  <h3>Formulario de contrato</h3>
        <div className={s.inputContainer}>
            <h4>Descripcion del trabajo</h4>
        <TextareaAutosize
        value = {input.description}
        onChange={handeInputChange}
        name='description'
        minRows={8}
        maxRows={8}
        placeholder='Descripcion del trabajo'
        style={{width : 450, fontSize:18,overflowY:"scroll", overflowX:"hidden"}}
        />
        </div>
        <div className={s.inputContainer}>
            <h4>Fecha</h4>
        <TextField
        value = {input.date}
        onChange={handeInputChange}
          type="datetime-local"
          name='date'
        />
        </div>
        <div className={s.inputContainer}>
            <h4>Lugar</h4>
        <TextField
        value = {input.location}
        onChange={handeInputChange}
          type="text"
          label="Lugar"
          name='location'
        />
        </div>
        <div className={s.inputContainer}>
        <button onClick={toggleModal} className='worker-button' style={{marginTop:"5%"}}><span>Enviar</span></button> 
        </div>
         */}
    </form>


  )
}

export default FormOpinion