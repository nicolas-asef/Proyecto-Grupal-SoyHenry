import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./styles/Filters.module.css";
import { filter, getJobs, orderByRating } from "../../redux/actions/actions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const Filters = (callbk) => {
  const dispatch = useDispatch();
  const jobs = useSelector (state => state.jobs)
  const [order, setOrder] = useState("");
  const [job, setJob] = useState("all");
  const [available, setAvailable] = useState("available");
  const [zone, setZone] = useState("all");
  const worker = useSelector((worker) => worker.workers);
  const filtrado = useSelector((worker) => worker.filters);

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

  return (
    <div className={styles.fieldContainer}>
      <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Rating"
          defaultValue=""
          select
          onChange={(e) => orderBy(e)}
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
          size="small"
          label="Oficio"
          select
					defaultValue=""
          onChange={(e) => filterjob(e)}
        >
          <MenuItem value="all">all</MenuItem>
          {jobs && jobs.map (job => {
            return (
              <MenuItem value={job.name} key={job.id}>{job.name}</MenuItem>
            )})
          }
          {/* <MenuItem value="all">all</MenuItem>
          <MenuItem value="Vendedor">Vendedor</MenuItem>
          <MenuItem value="Pintor">Pintor</MenuItem>
          <MenuItem value="Ingeniero">Ingeniero</MenuItem>
          <MenuItem value="Carpintero">Carpintero</MenuItem>
          <MenuItem value="Plomero">Plomero</MenuItem>
          <MenuItem value="Programador">Programador</MenuItem>
          <MenuItem value="Electricista">Electricista</MenuItem> */}
        </TextField>
      </div>
      <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Disponibilidad"
					defaultValue=""
          select
          onChange={(e) => filterAvailable(e)}
        >
          <MenuItem value="available">available</MenuItem>
          <MenuItem value={false}>Online</MenuItem>
          <MenuItem value={true}>Offline</MenuItem>
        </TextField>
      </div>

        {/* SE DESHABILITA MOMENTANEMANTE HASTA HACER UNA TABLA QUE CONTENGA LAS UBICACIONES PARA PODER MAPEARLAS  */}


      {/* <div className={styles.textField}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Ubicacion"
					defaultValue=""
          select
          onChange={(e) => filterZone(e)}
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="Buenos aires">Buenos aires</MenuItem>
          <MenuItem value="Cordoba">Cordoba</MenuItem>
          <MenuItem value="San Luis">San Luis</MenuItem>
          <MenuItem value="Chaco">Chaco</MenuItem>
        </TextField>
      </div> */}
    </div>
  );
};

export default Filters;
