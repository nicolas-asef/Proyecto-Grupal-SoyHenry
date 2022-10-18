// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import './About.css'
// import SearchBar from '../SearchBar/SearchBar'


// export default function About() {
//   return (
    
//     <div className='container-about__cards'>
//       <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>M</Avatar>
//         <Typography variant="h5" component="div">
//          Manu
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
      
//       <CardActions>
//         <Button size="small" href="https://github.com/mcanavari43">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in/manuel-canavari/">Linkedin</Button>
//       </CardActions>
//     </Card>
//     </div>
//     <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>L</Avatar>
//         <Typography variant="h5" component="div">
//           Lauti
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" href="https://github.com/">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
//       </CardActions>
//     </Card>
//     </div>
//     <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>G</Avatar>
//         <Typography variant="h5" component="div">
//           Guille
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" href="https://github.com/">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
//       </CardActions>
//     </Card>
//     </div>
//     <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>S</Avatar>
//         <Typography variant="h5" component="div">
//           Santi
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" href="https://github.com/">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
//       </CardActions>
//     </Card>
//     </div>
//     <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>N</Avatar>
//         <Typography variant="h5" component="div">
//           Nico
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" href="https://github.com/">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
//       </CardActions>
//     </Card>
//     </div>
//     <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>G</Avatar>
//         <Typography variant="h5" component="div">
//           Gonza
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" href="https://github.com/">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
//       </CardActions>
//     </Card>
//     </div>
//     <div className="about-card">
//     <Card sx={{ minWidth: 275 }}>
//       <CardContent>
//       <Avatar sx={{ width: 70, height: 70}}>L</Avatar>
//         <Typography variant="h5" component="div">
//           Lucas
//         </Typography>
//         <Typography sx={{ mb: 1.5 }} color="text.secondary">
//           Developer
//         </Typography>
//         <Typography variant="body2">
//           well meaning and kindly.
//           <br />
//           {'"a benevolent smile"'}
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small" href="https://github.com/">GitHub</Button>
//         <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
//       </CardActions>
//     </Card>
    
//     </div>

//     </div>
//   );
// }

import s from "./About.module.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function About(){
  return (
    <div className={s.pageAbout}>
      <div className={s.container}>
          <div className={s.top}>
            <div className={s.imgProfile}>
              <img className={s.img} src={require("./worker2.jpg")} alt="" />
            </div>
          </div>
          <div className={s.mid}>
            <div className={s.name}>Nico</div>
            <div className={s.job}>Developer</div>
            <div className={s.description}>Well meaning and kindly</div>
          </div>
          <div className={s.bottom}>
            <a href="#" className={s.a}>
              <GitHubIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <MailOutlineIcon fontSize="large"/>
            </a>
          </div>
      </div>
      <div className={s.container}>
          <div className={s.top}>
            <div className={s.imgProfile}>
              <img className={s.img} src={require("./worker2.jpg")} alt="" />
            </div>
          </div>
          <div className={s.mid}>
            <div className={s.name}>Manu</div>
            <div className={s.job}>Developer</div>
            <div className={s.description}>Well meaning and kindly</div>
          </div>
          <div className={s.bottom}>
            <a href="#" className={s.a}>
              <GitHubIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <MailOutlineIcon fontSize="large"/>
            </a>
          </div>
      </div>
      <div className={s.container}>
          <div className={s.top}>
            <div className={s.imgProfile}>
              <img className={s.img} src={require("./worker2.jpg")} alt="" />
            </div>
          </div>
          <div className={s.mid}>
            <div className={s.name}>Santi</div>
            <div className={s.job}>Developer</div>
            <div className={s.description}>Well meaning and kindly</div>
          </div>
          <div className={s.bottom}>
            <a href="#" className={s.a}>
              <GitHubIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <MailOutlineIcon fontSize="large"/>
            </a>
          </div>
      </div>
      <div className={s.container}>
          <div className={s.top}>
            <div className={s.imgProfile}>
              <img className={s.img} src={require("./worker2.jpg")} alt="" />
            </div>
          </div>
          <div className={s.mid}>
            <div className={s.name}>Guille</div>
            <div className={s.job}>Developer</div>
            <div className={s.description}>Well meaning and kindly</div>
          </div>
          <div className={s.bottom}>
            <a href="#" className={s.a}>
              <GitHubIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <MailOutlineIcon fontSize="large"/>
            </a>
          </div>
      </div>
      <div className={s.container}>
          <div className={s.top}>
            <div className={s.imgProfile}>
              <img className={s.img} src={require("./worker2.jpg")} alt="" />
            </div>
          </div>
          <div className={s.mid}>
            <div className={s.name}>Gonza</div>
            <div className={s.job}>Developer</div>
            <div className={s.description}>Well meaning and kindly</div>
          </div>
          <div className={s.bottom}>
            <a href="#" className={s.a}>
              <GitHubIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <MailOutlineIcon fontSize="large"/>
            </a>
          </div>
      </div>
      <div className={s.container}>
          <div className={s.top}>
            <div className={s.imgProfile}>
              <img className={s.img} src={require("./worker2.jpg")} alt="" />
            </div>
          </div>
          <div className={s.mid}>
            <div className={s.name}>Lauti</div>
            <div className={s.job}>Developer</div>
            <div className={s.description}>Well meaning and kindly</div>
          </div>
          <div className={s.bottom}>
            <a href="#" className={s.a}>
              <GitHubIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <LinkedInIcon fontSize="large"/>
            </a>
            <a href="#" className={s.a}>
              <MailOutlineIcon fontSize="large"/>
            </a>
          </div>
      </div>
    </div>
  )
}