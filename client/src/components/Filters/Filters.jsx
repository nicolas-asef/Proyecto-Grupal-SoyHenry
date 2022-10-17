import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/Filters.module.css";
import {
  filter,
  getJobs,
  get_countries,
  orderByRating,
} from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Filters = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");
  const [job, setJob] = useState("all");
  const [available, setAvailable] = useState("all");
  const [zone, setZone] = useState("all");
  const worker = useSelector((state) => state.workers);
  const filtrado = useSelector((state) => state.filtrado);
  const jobs = useSelector((state) => state.jobs);
  const countries = useSelector((state) => state.allCountries);

  const orderBy = (e) => {
    dispatch(orderByRating(worker, e.target.value));
    setOrder(`ordenado ${e.target.value}`);
  };

  const filterjob = (e) => {
    e.preventDefault();
    setJob(e.target.value);
    dispatch(filter(filtrado, e.target.value, available, zone));
  };

  const filterAvailable = (e) => {
    e.preventDefault();
    setAvailable(e.target.value);
    dispatch(filter(filtrado, job, e.target.value, zone));
  };

  const filterZone = (e) => {
    e.preventDefault();
    setZone(e.target.value);
    dispatch(filter(filtrado, job, available, e.target.value));
  };

  useEffect(() => {
    dispatch(getJobs());
    dispatch(get_countries());
  }, []);

  return (
    <div className={styles.fieldContainer}>
      <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          label="Rating"
          defaultValue=""
          select
          onChange={orderBy}
        >
          <MenuItem value="select">Seleccionar</MenuItem>
          <MenuItem value="maxRating">Mayor Rating</MenuItem>
          <MenuItem value="minRating">Menor Rating</MenuItem>
        </TextField>
      </div>
      <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          label="Oficio"
          select
          defaultValue=""
          onChange={filterjob}
        >
          <MenuItem value="all">All</MenuItem>
          {jobs &&
            jobs.map((job) => {
              return (
                <MenuItem value={job.name} key={job.id}>
                  {job.name}
                </MenuItem>
              );
            })}
        </TextField>
      </div>
      <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          label="Disponibilidad"
          defaultValue=""
          select
          onChange={filterAvailable}
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value={true}>Online</MenuItem>
          <MenuItem value={false}>Offline</MenuItem>
        </TextField>
      </div>
      <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="medium"
          label="Ubicacion"
          defaultValue=""
          select
          onChange={filterZone}
        >
          <MenuItem value="all">all</MenuItem>
          {countries &&
            countries.map((country) => {
              return (
                <MenuItem value={country.name} key={country.id}>
                  {country.name}
                </MenuItem>
              );
            })}
        </TextField>
      </div>
    </div>
  );
};

export default Filters;
