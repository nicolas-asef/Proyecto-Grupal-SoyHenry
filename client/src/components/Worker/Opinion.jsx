import React from 'react'
import CommentBox from './CommentBox'
import './Opinion.css'
import Estrella from '../../img/perfil.jpg';
import Perfil from '../../img/estrella.png';
import styled, { css } from 'styled-components'
import EmptyContainer from './EmptyContainer';





// export default function Opinion() {
//   return (
//     <div className=="opinion">
//       <p>
//         <div className='p-interior'>
//           <img className='o-img' src={Estrella} alt='nose'/>
//           Juan Ignacio Salvatore
//         </div>
      
//         <span>No me gusto</span></p>
//       <p>
//       <div className='p-interior'>
//           <img className='o-img' src={Estrella} alt='nose'/>
//           Barroso Gonzalo Carlos
//         </div>
//         <span>Safa</span></p>
//         <p>
//       <img className='o-img' src={Estrella} alt='nose'/>
//         <span>Considero que es una falta de respeto que vengan y te trabajen asi, encima te cobran 
//           muy caro, la verdad un pesimo servicio no lo recomiendo</span></p>
//           <p>
//       <img className='o-img' src={Estrella} alt='nose'/>
//         <span>La verdad es que me enamoro el chico con su casquito, su sonrisa y no lo digo porque sea yo mismo,
//           pero bueno, como trabajador no sirve</span></p>
//           <p>
//           <div className='p-interior'>
//           <img className='o-img' src={Perfil} alt='nose'/>
//           Estrellita donde estas
//         </div>
//         <span>La relación entre la ambientación y la actividad biológica es muy importante. Esto es así especialmente en la industria farmacéutica. Hace algunos años, varios estudios (e. g., Matsuda, 1992; Yoshii, 1993) informaron que ciertos antibióticos causaban problemas porque cada isómero actuaba de modo diferente en el cuerpo; por ejemplo, uno puede ser farmacológicamente activo, mientras que el otro puede ser inactivo, tener un grado diferente de actividad o causar efectos perjudiciales. El problema se acentúa porque los antibióticos racémicos son frecuentemente muy inferiores a los isómeros puros.Si el tamaño de el comentario mide mas de esto, poner puntos suspensivos...</span></p>
          
//     </div>
//   )
// }

const Opinion2 = styled.div`
height: auto;
`;

export default function Opinion({forceUpdate,contratos,tipo}) {
  let requerido = "requeridos"
  if(tipo)
    requerido = "terminados"
  let altura = 13
  if(contratos.length > 0)
    altura = contratos.length*13
  let key = 0
  return (
    <Opinion2 altura={altura} className='opinion'>      
    {contratos && contratos.length >0  ? contratos.map(e => {key+=1; return <CommentBox forceUpdate={forceUpdate} type={requerido !=='requeridos'? 'user/' : ''} id={e.id} rating={e.rating} key={key} descripcion={e.comment} nombre={e.name} imagen={e.img}/>}): <EmptyContainer texto = {requerido}/>}
  </Opinion2>
  )
}
