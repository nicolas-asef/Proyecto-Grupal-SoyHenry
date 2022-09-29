import React from 'react';
import { Link} from 'react-router-dom';

const Footer = () => {
	return (
		<footer>
        <div className="footer-container">
          <div>
            <h3>Red de trabajos</h3>
            <span>© 2022 | - Todos los derechos reservados</span>
            <ul>
              <li className="nav-link">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  tittle="Seguinos en Instagram"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li className="nav-link">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  tittle="Seguinos en Instagram"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li className="nav-link">
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  tittle="Seguinos en Instagram"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <hr />
          <div className="footer-links">
            <h4>¿Quiénes somos?</h4>
            <ul>
              <li>
                <Link to="/about">Sobre nosotros</Link>
              </li>
              <li>
                <Link to="/contact">Contáctanos</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
	)
};

export default Footer;
