import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from "./Footer.module.css";

const Footer = () => {
  let location = useLocation()
  const {pathname} = location;
	return (
		<footer className={s.footer}>
      {pathname !== '/about' &&(
        <div className={s.footerContainer}>
          <div>
            <h3>Red de trabajos</h3>
            <span>© 2022 | - Todos los derechos reservados</span>
            <ul className={s.footerContainer}>
              <li >
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  tittle="Seguinos en Instagram"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  tittle="Seguinos en Instagram"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <hr />
          <div className={s.footerLinks}>
            <h4>¿Quiénes somos?</h4>
            <ul>
              <li>
                <Link to="/about">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="/faq">FAQs</Link>
              </li>
            </ul>
          </div>
        </div>
        )}
      </footer>
	)
};

export default Footer;
