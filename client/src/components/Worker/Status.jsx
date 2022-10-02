import s from './Status.module.css'
import React from 'react'
import styled, { css } from 'styled-components'

export default function Status({text}) {

    const color = text === "Online" ? "#0fcc45" : "#cc0f0f"

    const ColorChanger2 = styled.div`
    background-color: ${color};
    `

    const ColorChanger = styled.span`
    background-color: ${color === "#cc0f0f" ? "#b6161600" : "#0fcc45"};
    `;
  return (

<div class={s.container}>

    <ColorChanger2 className={s.onlineIndicator}>
        <ColorChanger className={s.blink}></ColorChanger>
    </ColorChanger2>
   
    
  <h2 className={s.onlineText}>{text}</h2>
</div>


  )
}
