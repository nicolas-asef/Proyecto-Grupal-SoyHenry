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
        dispatch(getUserId(userAuth.user.id))
        
    },[dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        dispatch(updateUser(input, userAuth.user.id))
    }
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value  
            
        })
        
    }

    return (
        <div className='container-setting'>

            <div>
                <form onSubmit={onSubmit}>
                    <h1>Edit profile</h1>
                    <div className='bloke'>
                        <h3 className='pad'>Email</h3>
                        <TextField          
                        id="outlined-required"
                        label="Email"
                        name="email"
                        value={input.email}
                        defaultValue={user.email}  
                        onChange={handleChange}         
                        />
                    </div>
                    <hr/>
                    <div  className='bloke'>
                        <h3 className='pad'>Password</h3>
                        <TextField          
                        id="outlined-required"
                        label="Password"
                        name="password"
                        type="password"
                        value={input.password}
                        defaultValue={user.password} 
                        onChange={handleChange}          
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Location</h3>
                        <TextField          
                        id="outlined-required"
                        label="Location"
                        name="location"
                        value={input.location}
                        defaultValue={user.location}
                        onChange={handleChange}           
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Phone</h3>
                        <TextField          
                        id="outlined-required"
                        label="Phone" 
                        name="phone" 
                        value={input.phone}
                        defaultValue={user.phone}  
                        onChange={handleChange}       
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Image</h3>
                        <TextField          
                        id="outlined-required"
                        label="Image"
                        name="img"
                        value={input.img}
                        defaultValue={user.img} 
                        onChange={handleChange}          
                        />
                    </div>    
                    <hr/>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </form>
            </div>

        </div>
    )
}
