import React from 'react';
import './LandingPage.css'
// let location = useLocation
// const path = location
const LandingPage = () => {
	return (
    <div className="landing-container">
      <header className="header-container">
        <h1>Busca ese trabajo que necesitas</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          ducimus? Nostrum aspernatur culpa sed molestiae, blanditiis iusto,
          fugiat eveniet nobis iure sunt ipsa atque totam illum exercitationem
          delectus quos nemo?
        </p>
      </header>
      {/* <article>Haria un gif mostrando las cards de los workers</article> */}
      <section>
        <div className="expo-cards">
		  <h1>Reseñas de profesionales
            <br />
			<p>Nombre Oficios Descripcion Comentarios<br/> Lo recibiran las cards</p>
			</h1>
          <div className="expo-cards__container">
			
            <div className="expo-cards__card">
              <h3>Card 1</h3>
              <div className="expo-cards__logo">
                <div>
                  <img
                    src="https://wkncdn.com/newx/assets/build/img/home/logo-unx-digital.0dc0b8c8c.svg"
                    alt="comentario"
                    width="80px"
                    height="80px"
                  ></img>
                </div>
              </div>
            </div>
            <div className="expo-cards__card">
              <h3>Card 2</h3>
              <div className="expo-cards__logo">
                <div>
                  <img
                    src="https://wkncdn.com/newx/assets/build/img/home/logo-unx-digital.0dc0b8c8c.svg"
                    alt="comentario"
                    width="80px"
                    height="80px"
                  ></img>
                </div>
              </div>
            </div>
            <div className="expo-cards__card">
              <h3>Card 3</h3>
              <div className="expo-cards__logo">
                <div>
                  <img
                    src="https://wkncdn.com/newx/assets/build/img/home/logo-unx-digital.0dc0b8c8c.svg"
                    alt="comentario"
                    width="80px"
                    height="80px"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
