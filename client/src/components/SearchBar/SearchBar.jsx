
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getWorkersSearch } from "../../redux/actions/actions"

 export default function SearchBar() {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setInput(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getWorkersSearch(input))
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange}/>
            <input type="submit" placeholder="search"/>
        </form>
    )
}




