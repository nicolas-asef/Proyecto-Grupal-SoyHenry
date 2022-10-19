import s from "./CardsWorkers.module.css"
import StarIcon from '@mui/icons-material/Star';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function CardsWorkers({name, lastName, job, country, city, premium, img}){
    const styled = (premium) => {
        if (premium === false){
            return s.top
        }
        if (premium === true){
            return s.topPremium
        }
    }
    const styledimg = (premium) => {
        if (premium === false){
            return s.imgProfile
        }
        if (premium === true){
            return s.imgProfilePremium
        }
    }



    return (
        <div>
            <div className={s.container}>
                <div className={styled(premium)}>
                    <div className={s.name}>
                        {name} {lastName}
                    </div>
                    {premium && (
                        <div className={s.premiumName}>
                        Premium
                        <StarIcon className={s.star}/>
                        </div>
                    )}
                </div>
                <div className={s.bottom}>
                    <div className={s.divImgProfile}>
                        <img className={styledimg(premium)} src={`${img}`} alt="" />
                    </div>
                    <div className={s.data}>
                        <div className={s.job}>
                            {job}
                        </div>
                        <div className={s.country}>
                            {city}, {country}
                        </div>
                    </div>
                    <div className={s.location}>
                        <PinDropIcon fontSize="large"/>
                    </div>

                </div>
            </div>
        </div>
    )
}