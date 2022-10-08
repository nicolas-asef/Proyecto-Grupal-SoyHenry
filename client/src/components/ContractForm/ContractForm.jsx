import React from 'react'
import s from './ContractForm.module.css'
import { TextareaAutosize, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import { createContract } from '../../redux/actions/actions'

function ContractForm({toggleModal,id,worker_id}) {

    // const { user: { sub } } = useAuth0();
    
    const [input,setInput] = React.useState({
        id_worker: worker_id,
        id_user:id

    })

    const handeInputChange = function(e){
        // console.log(input.id_user)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        console.log(input)
        createContract(input)
        alert("Sali")
    }

  return (
    <form onSubmit={handleSubmit} className={s.contract}>
        <h3>Formulario de contrato</h3>
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
        
    </form>


  )
}

export default ContractForm