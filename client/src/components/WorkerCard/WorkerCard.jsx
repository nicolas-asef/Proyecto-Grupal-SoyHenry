import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom'
import s from './WorkerCard.module.css'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const WorkerCard = ({ Worker, User, Jobs, Contracts }) => {

    let finishedContracts = Contracts.filter(contract => contract.finished === true)

    return (
        <div className={s.conteiner}>
           {/* <Link to={`/worker/${Worker.ID}`}></Link> */}
            <div className={s.divImg}>
            <Stack direction="row" spacing={2}>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar alt="Remy Sharp" src={User.img} sx={{ width: 100, height: 100 }}/>
                </StyledBadge>
                </Stack>
            </div>
            
            <div className={s.divDescription}>
              <div className={s.divName}>
                <h2 className={s.h2}>{`${User.name} ${User.lastName}`}</h2>
              </div>
              <div className={s.divTop}>
              {Jobs && Jobs.map(job =><h3 className={`${s.h3} ${s.job}`}>{job.name}</h3>)}
              </div>
                <h3 className={s.h3}>Ubicación: {User.location}</h3>
                <h3 className={s.h3}>Estado: {User.status === false ? 'Desconectado' : 'Conectado'}</h3>
                <h3 className={s.h3}>Trabajos hechos: {finishedContracts.length}</h3>
            </div>
            <div className={s.divRating}>
            <Link className={s.perfilLink} to={`/worker/${Worker.ID}`}> <h3 className={s.h3}>Perfil</h3> </Link>
            <Rating
        name="read-only"
        value={Worker.rating}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
            </div>
            
        </div>
    )
}


export default WorkerCard


