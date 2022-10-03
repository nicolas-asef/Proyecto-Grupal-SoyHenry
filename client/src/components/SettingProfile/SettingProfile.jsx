import'./SettingsProfile.css'
import { getJobs, getUserId, updateUser } from '../../redux/actions/actions'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  TextField  from '@mui/material/TextField';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

export default function SettingProfile(){

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users)
    const userAuth = useSelector((state) => state.authState)
    
    const id = userAuth.user.id
    const [input, setInput] = useState({
        email: user.email,
        password: user.password,
        location: user.location,
        phone: user.phone,
        img: user.img
        
    })
    

    useEffect(() => {
        dispatch(getJobs())
        dispatch(getUserId(userAuth.user.id))
    },[])

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(input, userAuth.user.id))
    }
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value  
            
        })
        console.log(e.target.value)
    }

    return (
        <div>

            <div>
                <form onSubmit={onSubmit}>

                    <TextField          
                    id="outlined-required"
                    label="Email"
                    name="email"
                    value={input.email}
                    defaultValue={user.email}  
                    onChange={handleChange}         
                    />
                    <hr/>
                    <TextField          
                    id="outlined-required"
                    label="Password"
                    name="password"
                    value={input.password}
                    defaultValue={user.password} 
                    onChange={handleChange}          
                    />
                    <hr/>
                    <TextField          
                    id="outlined-required"
                    label="Location"
                    name="location"
                    value={input.location}
                    defaultValue={user.location}
                    onChange={handleChange}           
                    />
                    <hr/>
                    <TextField          
                    id="outlined-required"
                    label="Phone" 
                    name="phone" 
                    value={input.phone}
                    defaultValue={user.phone}  
                    onChange={handleChange}       
                    />
                    <hr/>
                    <TextField          
                    id="outlined-required"
                    label="Image"
                    name="img"
                    value={input.img}
                    defaultValue={user.img} 
                    onChange={handleChange}          
                    />
                    <hr/>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </form>
            </div>

        </div>
    )
}