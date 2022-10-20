import { Reacet, useState } from "react";
import style from "./OnBoarding.module.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import User from "./User/User";
import Avatar from "@mui/material/Avatar";
import { useAuth0 } from "@auth0/auth0-react";

const steps = [
  "Seleccionar tipo de usuario",
  "Completar información restante",
  "Finalizar y continuar",
];

const OnBoarding = () => {
  const { user } = useAuth0();
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState({
    type: "",
    isSelected: false,
  });

  const handleSelection = (e) => {
    setSelected({
      ...selected,
      type: e.target.name,
      isSelected: true,
    });
    setStep(1);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.middleContainer}>
        <div className={style.topInformation}>
          Finaliza de completar tu perfil
        </div>
        <div className={style.stepper}>
          <Stepper activeStep={step} alternativeLabel>
            {steps.map((label) => (
              <Step className={style.stepper} key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {!selected.type && (
            <div className={style.userType}>
              <div className={style.metadata}>
                <Avatar
                  alt="userImage"
                  src={user?.picture}
                  sx={{ width: 76, height: 76 }}
                />
                <h2>¡Hola, {user?.email.split("@")[0]}!</h2>
              </div>
              <Button
                fullWidth
                endIcon={<PersonIcon />}
                variant="outlined"
                name="client"
                onClick={handleSelection}
              >
                Usuario cliente
              </Button>
              <Button
                fullWidth
                endIcon={<BadgeIcon />}
                variant="outlined"
                name="worker"
                onClick={handleSelection}
              >
                Usuario trabajador
              </Button>
            </div>
          )}
          {selected.type !== "" && (
            <div className={style.userForm}>
              <User
                type={selected.type}
                stepperCb={setStep}
                authID={user?.sub}
                selectedCb={setSelected}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
