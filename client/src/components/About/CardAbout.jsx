import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import s from "./CardAbout.module.css"

    export default function CardAbout({name, img, linkedIn, gitHub}){
        console.log(name, img, linkedIn, gitHub)
      return (
        <div className={s.pageAbout}>
          <div className={s.container}>
              <div className={s.top}>
                <div className={s.imgProfile}>
                  <img className={s.img} src={require(`${img}`)} alt="" />
                </div>
              </div>
              <div className={s.mid}>
                <div className={s.name}>{name}</div>
                <div className={s.job}>Developer</div>
                <div className={s.description}>Well meaning and kindly</div>
              </div>
              <div className={s.bottom}>
                <a href={gitHub} className={s.a} target="_blank">
                  <GitHubIcon fontSize="large"/>
                </a>
                <a href={linkedIn} className={s.a} target="_blank">
                  <LinkedInIcon fontSize="large"/>
                </a>
              </div>
          </div>
        </div>
  )
}
