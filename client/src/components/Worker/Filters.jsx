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

export default function SelectAutoWidth() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: "50vw" }}>
        <InputLabel id="demo-simple-select-autowidth-label">Ordenar</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
    
          label="Ordenar"
        >
          <MenuItem value={210}>Mas recientes</MenuItem>
          <MenuItem value={21}>Positivos</MenuItem>
          <MenuItem value={22}>Negativos</MenuItem>
          <MenuItem value={25}>{age}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}