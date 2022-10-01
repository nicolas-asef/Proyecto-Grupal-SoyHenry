import { Avatar } from '@mui/material'
import React from 'react'
import './CommentBox.css'

function CommentBox({descripcion,imagen,nombre}) {
  return (
<p>
<div className="p-interior">
{/* <img className='o-img' src={imagen} alt='nose'/> */}
<Avatar alt={nombre} src={imagen} sx={{ width: 94, height: 94, marginLeft:2}} />
{nombre}
</div>

<span>{descripcion}</span></p>
  )
}

export default CommentBox

