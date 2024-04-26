import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText';

export default function MyStudiepoengField(props) {
  const{label,name, width,control} = props



  return (

        <Controller
            name = {name}
            control = {control}
            render={({
                field : {onChange,value},
                fieldState : {error},
                formState,

            }) => (
                <FormControl variant="standard" sx={{width:{width}}}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={onChange}
                    value = {value}
                    error = {!!error}  
                    >
                    <MenuItem value="">
                        <em></em>
                    </MenuItem>
                    <MenuItem value={'3,75'}>3,75</MenuItem>
                    <MenuItem value={'7,5'}>7,5</MenuItem>
                    <MenuItem value={'10'}>10</MenuItem>
                    <MenuItem value={'15'}>15</MenuItem>
                    <MenuItem value={'20'}>20</MenuItem>
                    <MenuItem value={'30'}>30</MenuItem>
                </Select>
                <FormHelperText sx={{color:"#d32f2f"}}>{error?.message} </FormHelperText>
                </FormControl>
            )
            }
            />

        

  

  );
}