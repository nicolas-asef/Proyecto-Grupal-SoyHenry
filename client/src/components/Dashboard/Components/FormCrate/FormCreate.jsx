import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import s from "./FormCreate.module.css";

export default function FormCreate({ callbk, name }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callbk(input);
  };
  let label = `Crear ${name}`;
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <TextField
        label={label}
        className={s.input}
        type="text"
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        variant="contained"
        size="large"
        type="submit"
        className={s.button}
      >
        Crear
      </Button>
    </form>
  );
}
