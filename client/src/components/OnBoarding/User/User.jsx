import { useState, useEffect } from "react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  finishUserCreation,
  getJobs,
  get_countries,
} from "../../../redux/actions/actions";
import style from "./User.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import { validator } from "../validator";
import { useAuth0 } from "@auth0/auth0-react";
import { sendNotification } from "../../../redux/actions/actions";

const User = (props) => {
  const dispatch = useDispatch();
  const { loginWithRedirect, isLoading, user } = useAuth0();
  const [jobsState, setJobsState] = useState([]);
  const [workMax, setWorkMax] = useState(false);
  const [validateWorks, setValidateWorks] = useState(false);
  const { jobs } = useSelector((state) => state);
  const countries = useSelector((state) => state.allCountries);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getJobs());
    dispatch(get_countries());
  }, [dispatch]);

  const handleJob = (e) => {
    setValidateWorks(false);
    props.stepperCb(2);
    const exist = jobsState.find((job) => job === e.target.value);
    if (jobsState.length < 3) {
      if (!exist) {
        setJobsState([...jobsState, e.target.value]);
      }
    } else {
      setWorkMax(true);
      setTimeout(() => {
        setWorkMax(false);
      }, 3000);
    }
  };

  const handleDelete = (e) => {
    setJobsState([
      ...jobsState.filter((job, index) => index !== parseInt(e.target.id)),
    ]);
  };

  const handleSelection = (e) => {
    props.selectedCb({
      type: "",
      isSelected: false,
    });
    props.stepperCb(0);
  };

  const onSubmit = (data) => {
    if (props.type === "worker" && !jobsState.length)
      return setValidateWorks(true);
    props.stepperCb(3);
    dispatch(finishUserCreation(props.authID, data, jobsState)).then((res) => {
      if (props.type === "worker") {
        dispatch(
          sendNotification(
            user.email,
            "Tu perfil de Trabajador se ha creado con exito !"
          )
        );
      } else {
        dispatch(
          sendNotification(
            user.email,
            "Tu cuenta ha sido creada de manera exitosa !"
          )
        );
      }

      if (res.status === 200) {
        loginWithRedirect();
      } else {
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.userclient}>
      <div className={style.inputContainer}>
        <TextField
          label="Nombre"
          type="text"
          error={errors.name ? true : false}
          helperText={validator(errors.name?.type, "name")}
          placeholder="Alfonso.."
          {...register("name", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          label="Apellido"
          type="text"
          error={errors.lastName ? true : false}
          helperText={validator(errors.lastName?.type, "lastname")}
          placeholder="Gutierrez.."
          {...register("lastName", {
            required: true,
            minLength: 4,
            maxLength: 15,
          })}
        />
      </div>
      <div className={`${style.inputContainer} ${style.horizontal}`}>
        <TextField
          label="Numero de telefono"
          type="text"
          placeholder="123456789.."
          fullWidth
          error={errors.phone ? true : false}
          helperText={validator(errors.phone?.type, "phone")}
          {...register("phone", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
        <TextField
          label="Documento (DNI)"
          type="text"
          fullWidth
          error={errors.dni ? true : false}
          helperText={validator(errors.dni?.type, "dni")}
          placeholder="123456789.."
          {...register("dni", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
      </div>
      <div className={style.inputContainer}>
        <TextField
          label="Pais"
          type="text"
          error={errors.location ? true : false}
          helperText={validator(errors.location?.type, "location")}
          placeholder="San miguel.."
          select
          onChange={() => props.stepperCb(2)}
          defaultValue=""
          {...register("location", {
            required: true,
          })}
        >
          {countries &&
            countries.map((countrie) => {
              return (
                <MenuItem key={countrie.id} value={countrie.name}>
                  {countrie.name}
                </MenuItem>
              );
            })}
        </TextField>
      </div>
      <div className={`${style.inputContainer} ${style.horizontal}`}>
        <TextField
          label="Localidad"
          type="text"
          fullWidth
          placeholder="Buenos aires"
          error={errors.city ? true : false}
          helperText={validator(errors.city?.type, "city")}
          {...register("city", {
            required: true,
          })}
        />
        <TextField
          label="Direccion"
          type="text"
          fullWidth
          error={errors.street ? true : false}
          helperText={validator(errors.street?.type, "street")}
          placeholder="Avenida siempreviva"
          {...register("street", {
            required: true,
          })}
        />
        <TextField
          label="Numero"
          type="text"
          placeholder="742"
          {...register("address", {
            required: true,
            pattern: /^[0-9]*$/,
          })}
        />
      </div>
      {props.type === "worker" && (
        <>
          <div className={style.inputContainer}>
            <TextField
              id="jobs"
              label="Oficio"
              select
              defaultValue=""
              onChange={handleJob}
              error={workMax || validateWorks}
              helperText={
                workMax
                  ? "Maximo tres oficios inicialmente"
                  : null || validateWorks
                  ? "El campo es requerido"
                  : null
              }
              placeholder="Electricista.."
            >
              {jobs &&
                jobs.map((job) => (
                  <MenuItem key={job.id} value={job.name}>
                    {job.name}
                  </MenuItem>
                ))}
            </TextField>
          </div>
          <div className={`${style.inputContainer} ${style.jobsStyle}`}>
            <ButtonGroup fullWidth variant="outlined">
              {jobsState.length
                ? jobsState.map((job, index) => (
                    <Button
                      size="large"
                      onClick={handleDelete}
                      id={index}
                      key={job}
                    >
                      {job}
                    </Button>
                  ))
                : null}
            </ButtonGroup>
          </div>
        </>
      )}
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        value="Registrarse"
        sx={{ background: "#06283d" }}
      >
        Registrarse
      </Button>
      <Button
        className={style.back}
        fullWidth
        variant="outlined"
        color="error"
        onClick={handleSelection}
      >
        Volver
      </Button>
    </form>
  );
};

export default User;
