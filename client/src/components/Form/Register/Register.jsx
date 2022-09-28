import { React, useState } from "react";
import style from "./Register.module.css";
import User from "./User/User"

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
			<button onClick={handleBack}>Back</button>
			<h2>Registro</h2>
      {!selected.type && (
        <div>
          <label htmlFor="TypeUser">¿Como quieres registrarte?</label>
          <div className={style.selection}>
            <button name="client" onClick={handleSelection}>Client</button>
            <button name="worker" onClick={handleSelection}>Trabajador</button>
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
