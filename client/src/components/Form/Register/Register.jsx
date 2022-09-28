import { React, useState } from "react";
import style from "./Register.module.css";
import UserClient from "./UserClient/UserClient"
import UserWorker from "./UserWorker/UserWorker"

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
			{selected.type === 'client' && (
				<UserClient />
			)}
			{selected.type === 'worker' && (
				<UserWorker />
			)}
    </div>
  );
};

export default Register;
