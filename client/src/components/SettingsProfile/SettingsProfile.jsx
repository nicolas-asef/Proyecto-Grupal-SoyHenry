import'./SettingsProfile.css'
import { getJobs, getUserId, updateUser, updateWorker, get_countries } from '../../redux/actions/actions'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  TextField  from '@mui/material/TextField';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from "@mui/material/MenuItem";

export default function SettingProfile(){

    const dispatch = useDispatch()
    const { user: { sub } } = useAuth0();
    const { jobs } = useSelector((state) => state);
    const countries = useSelector((state) => state.allCountries);
    const user = useSelector((state) => state.users)
    const userAuth = useSelector((state) => state.authState)
    const navigate = useNavigate()
    const id = sub;
    //const id = userAuth.user.id
    const [input, setInput] = useState({
        email: user.email,
        location: user.location,
        phone: user.phone,
        img: user.img       
    })
    
    const [inputWork, setInputWork] = useState({
        certification: user.Worker.certification,
        description: user.Worker.description,
        jobs: user.Worker.Jobs
    })
    
    useEffect(() => {       
        dispatch(getUserId(id))
        dispatch(getJobs());
        dispatch(get_countries());
    },[dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        dispatch(updateUser(input, id))
        dispatch(updateWorker(inputWork, user.Worker.ID))
    }
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value              
        })       
    }

    function handleChangeWork(e){
        setInputWork({
            ...inputWork,
            [e.target.name]: e.target.value
        })
    }
    
    function handlePremium(){
        navigate('/profile/settings/premium')
    }

    return (
        <div className='container-setting'>

            <div>
                <form onSubmit={onSubmit}>
                    <h1>Edit profile</h1>
                    <div className='bloke'>
                        <h3 className='pad'>Location</h3>
                        <TextField          
                        id="outlined-required"
                        label="Location"
                        name="location"
                        select
                        value={input.location.name}
                        /* defaultValue={user.location} */
                        onChange={handleChange}           
                        >
                        {countries &&
                            countries.map((country) => (
                            <MenuItem key={country.id} value={country.name}>
                                {country.name}
                            </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Phone</h3>
                        <TextField          
                        id="outlined-required"
                        label="Phone" 
                        name="phone" 
                        value={input.phone}
                        /* defaultValue={user.phone}  */ 
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
                        /* defaultValue={user.img}  */
                        onChange={handleChange}          
                        />
                    </div>    
                    <hr/>
{/* renderizado condicional para el worker solamente */}
            {user.Worker && (
                <>
                <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Description</h3>
                        <TextField          
                        id="outlined-required"
                        label="Description"
                        name="description"
                        type="text"
                        value={inputWork.description}
                        placeholder={user.Worker.description}
                        /* defaultValue={user.password} */ 
                        onChange={handleChangeWork}          
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Certification</h3>
                        <TextField          
                        id="outlined-required"
                        label="Certification"
                        name="certification"
                        type="text"
                        value={inputWork.certification}
                        placeholder={user.Worker.certification}
                        /* defaultValue={user.password} */ 
                        onChange={handleChangeWork}          
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Jobs</h3>
                        <TextField          
                        id="outlined-required"
                        label="Jobs"
                        name="jobs"
                        type="text"
                        select
                        value={inputWork.jobs}  
                        placeholder="Select your jobs"                      
                        defaultValue="Select your jobs"
                        onChange={handleChangeWork}          
                        >
                        {jobs &&
                            jobs.map((job) => (
                            <MenuItem key={job.id} value={job.name}>
                                {job.name}
                            </MenuItem>
                            ))}
                        </TextField>
                    </div>
                        </>
                    )}
                    
                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </form>              
            </div>
            <div>
                <Button type="submit" variant="contained" onClick={handlePremium}>
                PREMIUM hermano premiuuuum
                </Button>    
            </div>
        </div>
    )
}
