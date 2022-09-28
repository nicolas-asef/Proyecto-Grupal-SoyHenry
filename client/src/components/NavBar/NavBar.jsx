import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
	return (
    <div className="nav-container">
      <div className="left">
        <div className='logo'><img alt="logo"/>
        <span>Title</span>
        </div>
        <button>Home</button>
      </div>
      <div className="right-container">
        <div className="login">
          <Link to="/users/login">
            <button className="btn-login">Login</button>
          </Link>
        </div>
        <div className="register">
          <Link to="/users/register">
            <button className="btn-register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
