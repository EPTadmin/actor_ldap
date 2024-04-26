import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText';


export default function MySemesterField(props) {
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
                    <MenuItem value={'V'}>V</MenuItem>
                    <MenuItem value={'H'}>H</MenuItem>
                </Select>
                <FormHelperText sx={{color:"#d32f2f"}}>{error?.message} </FormHelperText>
                </FormControl>
            )
            }
            />

        

  

  );
}