import { React, useState } from "react";
import style from "./Register.module.css";
import User from "./User/User"
import Button from '@mui/material/Button';

const Register = () => {
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
  };

	const handleBack = (e) => {
		setSelected({
			type: "",
			isSelected: false,
		});
	};

  return (
    <div>
			<Button disabled={selected.isSelected ? false : true} variant="outlined" onClick={handleBack}>Back</Button>
			<h2>Registro</h2>
      {!selected.type && (
        <div>
          <label htmlFor="TypeUser">¿Como quieres registrarte?</label>
          <div className={style.selection}>
            <Button variant="contained" name="client" onClick={handleSelection}>Client</Button>
            <Button variant="contained" name="worker" onClick={handleSelection}>Trabajador</Button>
          </div>
        </div>
      )}
			{selected.type !== '' && (
				<User type={selected.type}/>
			)}
    </div>
  );
};

export default Register;
