import React from 'react'
import e from './EmptyContainer.module.css'

function EmptyContainer({texto}) {
  return (
    <p><div className={e.vacio}>No se han registrado trabajos {texto} aun.</div></p>
  )
}

export default EmptyContainer