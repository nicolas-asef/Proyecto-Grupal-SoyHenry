import { useState } from "react";
import { useDispatch } from "react-redux";
import { getWorkersSearch } from "../../redux/actions/actions";
import { sendNotification } from "../../redux/actions/actions";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import style from "./SearchBar.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchBar({callbk}) {
  
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getWorkersSearch(input));
    dispatch(
      sendNotification(
        "viottilucas16@gmail.com",
        "Has creado tu perfil de trabajador con exito !!"
      )
    );
    callbk()
  };
  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TextField
          id="standard-basic"
          label="Buscar un oficio o nombre de trabajador"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <Button
          variant="contained"
          size="small"
          type="submit"
          endIcon={<SearchIcon />}
        >
          Buscar
        </Button>
      </Box>
    </form>
  );
}
