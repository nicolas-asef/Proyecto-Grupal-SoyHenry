import React from 'react'
import e from './EmptyContainer.module.css'

function EmptyContainer() {
  return (
    <p><div className={e.vacio}>No se han registrado trabajos terminados aun.</div></p>
  )
}

export default EmptyContainer