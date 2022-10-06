import React from 'react'
import CardContract from '../CardContract/CardContract'
import ContractForm from '../ContractForm/ContractForm'
import style from './CardContracts.module.css'

function CardContracts({tipo}) {
  return (
    <div className={style.cardContracts}>
      <CardContract/>
      <CardContract/>
      <CardContract/>
      <ContractForm/>
    </div>
  )
}

export default CardContracts