import React from 'react'
import { connect } from 'react-redux'
import Banner from '../../img/banner.png';
import './Worker.css'
import Profile from './Profile';
import Stats from './Stats';
import Opinion from './Opinion';

export const Worker = (props) => {
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
            <Opinion contratos={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]}/>
        </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Worker)