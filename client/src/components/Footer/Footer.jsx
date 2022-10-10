import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from "./Footer.module.css";
import IconButton from '@mui/material/IconButton';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  let location = useLocation()
  const {pathname} = location;
	return (
    <>
      <hr/>
        <footer className={s.footer}>
          {pathname !== '/about' &&(
            <div className={s.footerContainer}>
                <div className={s.social}>
                  <h3>Red de trabajos</h3>
                  <span>© 2022 | - Todos los derechos reservados</span>
                  <ul className={s.footerContainer}>
                    <li >
                      <IconButton aria-label="delete" href="https://www.instagram.com" target="_blank"  tittle="Seguinos en Instagram" rel="noreferrer">
                        <InstagramIcon fontSize='large'/>
                      </IconButton>
                    </li>
                    <li >
                      <IconButton aria-label="delete" href="https://www.facebook.com" target="_blank" tittle="Seguinos en Instagram" rel="noreferrer">
                        <FacebookIcon fontSize='large'/>
                      </IconButton>
                    </li>
                  </ul>
                </div>
            </div>
            )}
        </footer>
      <hr/>
    </>
	)
};

export default Footer;