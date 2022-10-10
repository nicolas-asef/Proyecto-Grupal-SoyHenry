import React from 'react'
import e from './EmptyContainer.module.css'

function EmptyContainer({texto}) {
  return (
    <div className={e.emptyStyle}><div className={e.vacio}>No se han registrado trabajos {texto} aun.</div></div>
  )
}

export default EmptyContainer