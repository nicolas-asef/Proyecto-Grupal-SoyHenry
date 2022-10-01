import { Avatar } from '@mui/material'
import React from 'react'
import './CommentBox.css'
import { Typography, Rating,Box } from '@mui/material';


function CommentBox({descripcion,imagen,nombre,rating}) {
  return (
<p>
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
 
</p>
  )
}

export default CommentBox

