import s from "./CardsWorkers.module.css"
import StarIcon from '@mui/icons-material/Star';
import PinDropIcon from '@mui/icons-material/PinDrop';

export default function CardsWorkers(){
    return (
        <div>
            <div className={s.container}>
                <div className={s.top}>
                    <div className={s.name}>
                        Agustin Alvarez
                    </div>
                </div>
                <div className={s.bottom}>
                    <div className={s.divImgProfile}>
                        <img className={s.imgProfile} src={require("./worker2.jpg")} alt="" />
                    </div>
                    <div className={s.data}>
                        <div className={s.job}>
                            Plomero
                        </div>
                        <div className={s.country}>
                            Cordoba, Argentina
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
