import'./SettingsProfile.css'
import { getJobs, getUserId, updateUser, uploadImage } from '../../redux/actions/actions'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  TextField  from '@mui/material/TextField';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function SettingProfile(){

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users)
    const userAuth = useSelector((state) => state.authState)
    const uploadedImage = useSelector(state => state.uploadedImg)
    const navigate = useNavigate()
/*     const [image, setImage] = useState("") */
    const id = userAuth.user.id
    const [input, setInput] = useState({
        email: user.email,
        password: user.password,
        location: user.location,
        phone: user.phone,
        img: user.img
        
    })
/*     const uploadImage = async(e) => {
        const formData = new FormData()
        formData.append("file", image)
        formData.append("upload_preset", "jobplatform")

       await axios.post("https://api.cloudinary.com/v1_1/dh0mqr8fy/image/upload", formData)
        .then((res) =>res.data)
        .then(data =>{
            console.log(data.url)
            setInput((prevState) => ({
                ...prevState, img: data.url
            }))
        } )
/*         https://res.cloudinary.com/dh0mqr8fy/image/upload/w_250,h_250,c_scale
        https://api.cloudinary.com/v1_1/dh0mqr8fy/image/upload 
    }
    const handleImgChange = (e) => {
        setImage(e.target.files[0])
    } */


    //////////////////CLOUDINARY STUFF//////////////////////
      const [image, setImage] = useState("")
    
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "jobplatform")
    
    const handleImgChange = (e) => {
        setImage(e.target.files[0])
    }
    const uploadImage = () => {
         dispatch(uploadImage(formData)) 
        console.log(formData)
/*          setInput((prevState)=> ({
            ...prevState, img: uploadedImage
        })) */
    }  
    ////////////////////////////////////////////////////////

    // ///////SECOND ATTEPMT/////////
/*          const [image, setImage] = useState("")
    
    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "jobplatform")
    
    const handleImgChange = (e) => {
        setImage(e.target.files[0])
    }
    const uploadImage = () => {
        dispatch(uploadImage(formData))
        console.log(uploadedImage)
         setInput((prevState)=> ({
            ...prevState, img: uploadedImage
        }))
    } */
    ////////////////////////////////////


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

    function handlePremium(){
        navigate('/profile/settings/premium')
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
                        /* defaultValue={user.email} */  
                        onChange={handleChange}         
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Password</h3>
                        <TextField          
                        id="outlined-required"
                        label="Password"
                        name="password"
                        type="password"
                        value={input.password}
                        placeholder={user.password}
                        /* defaultValue={user.password} */ 
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
                        /* defaultValue={user.location} */
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
                        /* defaultValue={user.phone}  */ 
                        onChange={handleChange}       
                        />
                    </div>
                    <hr/>
                    <div className='bloke'>
                        <h3 className='pad'>Image</h3>

                            <Button variant="contained" component="label">
                                Selecionar archivo
                                <input name='img' hidden accept="image/*" multiple type="file" onChange={handleImgChange} />
                            </Button>
                                <span>{`${image === "" ? "" : image.name.length < 15 ? image.name : `${image.name.slice(0,15)}...`}`}</span>
                        <button type='button' onClick={uploadImage}>Upload</button>

                    </div>  
                    <hr/>
                    <Button type="submit" variant="contained" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </form>


                
            </div>
            <div>
                <button onClick={handlePremium}>PREMIUM</button>
            </div>
        </div>
    )
}
