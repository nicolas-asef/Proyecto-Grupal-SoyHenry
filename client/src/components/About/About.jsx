import CardAbout from "./CardAbout";
import s from "./About.module.css"
import Footer from "../Footer/Footer";

  export default function About(){
    return (
      <div>
        <div className={s.container}>
          <CardAbout
            name={"Nicolas Asef"}
            img={"./img/nico.png"}
            linkedIn={"https://www.linkedin.com/in/nicolas-asef/"}
            gitHub={"https://github.com/nicolas-asef"}
          />
          <CardAbout
            name={"Lautaro Lesniewicz"}
            img={"./img/lauti.jpg"}
            linkedIn={"https://www.linkedin.com/in/lautaro-lesniewicz-a50062226/"}
            gitHub={"https://github.com/LautaroLesni"}
          />
          <CardAbout
            name={"Manuel Canavari"}
            img={"./img/manu.jpg"}
            linkedIn={"https://www.linkedin.com/in/manuel-canavari/"}
            gitHub={"https://github.com/mcanavari43"}
          />
          <CardAbout
            name={"Gonzalo Barroso"}
            img={"./img/gonza.jpg"}
            linkedIn={"https://www.linkedin.com/in/gonzalo-barroso-4ab95b164/"}
            gitHub={"https://github.com/Gon159x"}
          />
          <CardAbout
            name={"Guillermo Calvo"}
            img={"./img/guille.jpg"}
            linkedIn={"https://www.linkedin.com/in/guillermo-calvo-790948192/"}
            gitHub={"https://github.com/GgaacCalvo"}
          />
          <CardAbout
            name={"Santino Cattaneo"}
            img={"./img/santi.jpg"}
            linkedIn={"https://www.linkedin.com/in/santino-cattaneo-140291245/"}
            gitHub={"https://github.com/sonnyrmt"}
          />
          <CardAbout
            name={"Lucas Viotti"}
            img={"./img/lucas.jpg"}
            linkedIn={"https://linkedin.com/in/lucas-viotti-4b7b05233"}
            gitHub={"https://github.com/lucasviotti94"}
          />
        </div>
        <div className={s.footer}>
          <Footer />
        </div>
      </div>
  )
}

