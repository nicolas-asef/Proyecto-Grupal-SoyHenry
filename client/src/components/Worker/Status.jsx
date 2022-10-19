import s from './Status.module.css'
import React from 'react'
import styled, { css } from 'styled-components'


const ColorChanger2 = styled.div`
  background-color: ${ (props) => props.color};
`

const ColorChanger = styled.span`
  background-color: ${ (props) => props.color === "#cc0f0f" ? "#b6161600" : "#0fcc45"};
`;

export default function Status({text}) {

    const color = text === "Conectado" ? "#0fcc45" : "#cc0f0f"

  return (

<div className={s.container}>

    <ColorChanger2 color={color} className={s.onlineIndicator}>
        <ColorChanger color={color} className={s.blink}></ColorChanger>
    </ColorChanger2>
   
    
  <h2 className={s.onlineText}>{text}</h2>
</div>


  )
}
