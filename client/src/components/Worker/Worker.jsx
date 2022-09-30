import React from 'react'
import { connect } from 'react-redux'
import Banner from '../../img/banner.png';
import './Worker.css'
import Profile from './Profile';
import Stats from './Stats';
import Opinion from './Opinion';
import { Pagination } from '@mui/material';
import Filters from './Filters';

export const Worker = (props) => {

  const handleChange = (e) => {
    console.log((e.target.innerText))
  }

  return (
    <div className="worker">
        <div className="w-left">
                <Profile/>
            </div>
        <div className="w-portada">
            <img src={Banner} alt='banner'/>
        </div>
        <div className="w-right">
            <Stats/>
            <div className="filters">
              <Filters/>
            </div>
            <Opinion contratos={[1,2,3,4,5]}/>
            {/* siempre deberia enviarle de a 5 contratos maximo */}
            <div className="pagination">
             <Pagination count={55} onChange={handleChange} hidePrevButton hideNextButton/>
            </div>
            
            {/* la cantidad de paginas es la cantidad de contratos total dividida entre 5 */}
        </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    detailedWorker: state.detailedWorker
  }
}

const mapDispatchToProps = (dispatch) => {
  // return{
  //   getDetailedWorker: (id) => dispatch(getDetailedWorker(id))
  // }
}

export default connect(mapStateToProps, mapDispatchToProps)(Worker)