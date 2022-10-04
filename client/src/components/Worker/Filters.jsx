// import * as React from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { NativeSelect } from '@mui/material';

// export default function Filters() {




//   return (
// <FormControl fullWidth>
//   <InputLabel variant="standard" htmlFor="uncontrolled-native">
//     Ordenar
//   </InputLabel>
//   <NativeSelect
//     defaultValue={30}
//     inputProps={{
//       name: 'ordenar',
//       id: 'uncontrolled-native',
//     }}
//   >
//     <option value={10}>Valoraciones positivas </option>
//     <option value={10}>Valoraciones negativas</option>
//     <option value={20}>Mas recientes</option>
//   </NativeSelect>
// </FormControl>
//   );
// }


import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';

export default function SelectAutoWidth({filtrado}) {
  const [tipo, setTipo] = React.useState('');
  
  useEffect(() => {
    filtrado(tipo)
  }, [tipo])
  
  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: "50vw" }}>
        <InputLabel id="demo-simple-select-autowidth-label">Ordenar </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={tipo}
          onChange={handleChange}
    
          label="Ordenar"
        >
          <MenuItem value={"r"}>Mas recientes</MenuItem>
          <MenuItem value={"p"}>Positivos</MenuItem>
          <MenuItem value={"n"}>Negativos</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}