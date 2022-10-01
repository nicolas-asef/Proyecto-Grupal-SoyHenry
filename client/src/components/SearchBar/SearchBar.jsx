
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getWorkersSearch } from "../../redux/actions/actions"
import { Alert } from '@mui/material';
import {Stack} from '@mui/material';


    
  

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
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange}/>
            <input type="submit" placeholder="search"/>
        </form>
    )
}




