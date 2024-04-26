import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'

export default function MyMultiCourseField3(props) {
  const{label,name, width,control,options} = props



  return (
      <FormControl variant="standard" sx={{width:{width}}}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Controller
            name = {name}
            control = {control}
            render={({
                field : {onChange,value},
                fieldState : {error},
                formState,

            }) => (

                <Select
                    // multiple

                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={onChange}
                    value = {value}
                    error ={!!error}
                    >
                {options.map((option) => (
                <MenuItem
                 value={option.id}
                 >
                 {option.name}
            </MenuItem>
                 ))}


                </Select>
            )
            }
            />

        
      </FormControl>

  

  );
}