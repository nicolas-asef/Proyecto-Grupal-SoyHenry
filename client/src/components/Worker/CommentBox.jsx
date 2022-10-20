import { Avatar } from '@mui/material'
import React from 'react'
import './CommentBox.css'
import { Typography, Rating,Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function CommentBox({forceUpdate,descripcion,imagen,nombre,rating,type,id}) {
  const navigate = useNavigate()
  const navegar = () => {
    navigate('/profile/'+type+id);
    forceUpdate()
  };

  return (
    <div onClick={navegar}>
        <div className="commentBoxContainer">
          <div className="c-left">
            {/* <img className='o-img' src={imagen} alt='nose'/> */}
            <Avatar alt={nombre} src={imagen} sx={{ width: 94, height: 94, marginLeft:2}} />
            {nombre}
          </div>
          <div className="c-right">
          
            <div className="c-rating">
              <Rating name="read-only" value={rating} readOnly  precision={0.1}/>
            </div>
            <span className="c-description">{descripcion}</span>
          </div>
       </div>
    </div>
        
  )
}

export default CommentBox

