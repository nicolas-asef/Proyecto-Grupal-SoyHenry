import TextField from '@mui/material/TextField';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getWorkersSearch } from "../../redux/actions/actions"

import { Alert } from '@mui/material';
import {Stack} from '@mui/material';


    

import SearchIcon from "@mui/icons-material/Search";
import { Button } from '@mui/material';
import style from './SearchBar.module.css'


 export default function SearchBar() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const validate = () => {
        if(!input){
            return (
                <Stack sx={{ width: '100%' }} spacing={2}>
                  <Alert variant="filled" severity="error">
                    This is an error alert — check it out!
                  </Alert>
                  
                </Stack>
              );
        }
    }

    




    const handleSubmit = (e) => {
        e.preventDefault()
        validate()
        dispatch(getWorkersSearch(input.trim()))
    }
    return (
        <form className={style.search} onSubmit={handleSubmit}>
            <TextField fullWidth placeholder='Buscar un oficio o nombre de trabajador' type="text" variant="outlined" size='small' onChange={handleChange}/>
            <Button variant='contained' size='medium' type='submit' endIcon={<SearchIcon/>}>Buscar</Button>
        </form>
    )
}




