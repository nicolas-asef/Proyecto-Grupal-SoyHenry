import React from 'react'
import './CommentBox.css'


function CommentBox({descripcion,imagen,nombre}) {
  return (
<p>
<div className="p-interior">
<img className='o-img' src={imagen} alt='nose'/>
{nombre}
</div>

<span>{descripcion}</span></p>
  )
}

export default CommentBox

