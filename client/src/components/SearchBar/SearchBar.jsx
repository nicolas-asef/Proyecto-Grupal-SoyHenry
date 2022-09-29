import TextField from '@mui/joy/TextField';
import Button from '@mui/joy/Button';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getWorkers, getJobs} from "../../redux/actions/actions"

export default function SearchBar() {
       
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('name')
    let dispatch = useDispatch();    
    const workers = useSelector((state) => state.workers)
    const jobs = useSelector((state) => state.jobs )

    useEffect(() => {
        dispatch(getJobs());
        dispatch(getWorkers())
      }, []);
    const onSearch =  (e) => {
        e.preventDefault()
        validate() 
        dispatch( getWorkers(query, search.trim()))  
        console.log(workers)           
        setSearch('')     
        
    }
    const validate = () => {
        const exist = jobs.find((e) => e === search)    
        if(!search.trim()){
            return alert("Please insert a name or job")
        }
        if(exist){
            setQuery('job')
        }

    }
    function handleInputChange(e) {
    setSearch(e.target.value)    
    }
    
    return (
        <div>
            <h3>¿Que profesional estas buscando hoy?</h3>
            <div>
                
                <TextField
                    color="neutral"
                    disabled={false}
                    label=""
                    placeholder="Search your profesional"
                    size="md"
                    variant="outlined"
                    onChange={handleInputChange}
                />
                <Button 
                color="primary"
                disabled={false}
                onClick={onSearch}
                size="md"
                variant="solid"
                value={search}>
                SEARCH
                </Button>
            </div>
        </div>
      
        )
}


