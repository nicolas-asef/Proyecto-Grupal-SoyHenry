import './SettingsProfile.css'
import { getJobs, getUserId, updateUser, uploadImage } from '../../redux/actions/actions'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export default function SettingProfile() {

    const dispatch = useDispatch()
    const { user: { sub } } = useAuth0();
    const user = useSelector((state) => state.users)
    const userAuth = useSelector((state) => state.authState)
    const uploadedImage = useSelector(state => state.uploadedImg)
    const navigate = useNavigate()
    const id = sub;
    //const id = userAuth.user.id
    const [input, setInput] = useState({
        email: user.email,
        password: user.password,
        location: user.location,
        phone: user.phone,
        img: user.img

    })

    //////////////////CLOUDINARY STUFF//////////////////////
    const [image, setImage] = useState("")
    const [uploaded, setUploaded] = useState(false)
    useEffect(() => {
        setInput((prevState) => ({
            ...prevState, img: uploadedImage.url
        }))
    }, [uploadedImage])

    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "jobplatform")

    const handleImgChange = (e) => {
        if (e.target.files !== undefined){
            setImage(e.target.files[0])
            console.log(image)
        }
        else{
            setImage("")
        }
    }
    const uploadImageHandler = () => {
        if (image !== "" && image !== undefined) {
            dispatch(uploadImage(formData))
            setImage("")
        }
    }
    ////////////////////////////////////////////////////////
    
    useEffect(() => {       
        dispatch(getUserId(id))
        
    },[dispatch])

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(input)
        dispatch(updateUser(input, id))
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value

        })
    }

    function handlePremium() {
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
                    <hr />
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
                    <hr />
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
                    <hr />
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
                    <hr />
                    <div className='bloke'>
                        <h3 className='pad'>Image</h3>
                        <div className='UploadIMGDIV'>
                            <Button variant="contained" component="label">
                                Selecionar archivo
                                <input name='img' hidden accept="image/*" multiple type="file" onChange={handleImgChange} />
                            </Button>
                             <span className='imgName'>{`${image === "" || image === undefined  ? "" : image.name.length < 15 ? image.name : `${image.name.slice(0, 15)}...`}`}</span>
                            {image === "" || image === undefined ? "" : <Button variant="contained" color="success" onClick={uploadImageHandler}>Subir Imagen</Button>}
                            {uploaded === true ? <span className='SuccessIMG'>Imagen subida correctamente, persiona el botón Send para guardar los cambios</span> : ""}
                        </div>
                    </div>
                    <hr />
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
