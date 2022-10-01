import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './About.css'
import SearchBar from '../SearchBar/SearchBar'


export default function About() {
  return (
    
    <div className='container-about__cards'>
      <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>M</Avatar>
        <Typography variant="h5" component="div">
         Manu
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      
      <CardActions>
        <Button size="small" href="https://github.com/mcanavari43">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in/manuel-canavari/">Linkedin</Button>
      </CardActions>
    </Card>
    </div>
    <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>L</Avatar>
        <Typography variant="h5" component="div">
          Lauti
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://github.com/">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
      </CardActions>
    </Card>
    </div>
    <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>G</Avatar>
        <Typography variant="h5" component="div">
          Guille
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://github.com/">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
      </CardActions>
    </Card>
    </div>
    <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>S</Avatar>
        <Typography variant="h5" component="div">
          Santi
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://github.com/">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
      </CardActions>
    </Card>
    </div>
    <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>N</Avatar>
        <Typography variant="h5" component="div">
          Nico
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://github.com/">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
      </CardActions>
    </Card>
    </div>
    <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>G</Avatar>
        <Typography variant="h5" component="div">
          Gonza
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://github.com/">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
      </CardActions>
    </Card>
    </div>
    <div className="about-card">
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Avatar sx={{ width: 70, height: 70}}>L</Avatar>
        <Typography variant="h5" component="div">
          Lucas
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Developer
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href="https://github.com/">GitHub</Button>
        <Button size="small" href="https://www.linkedin.com/in//">Linkedin</Button>
      </CardActions>
    </Card>
    
    </div>

    </div>
  );
}

