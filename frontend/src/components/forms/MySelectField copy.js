import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'

export default function MySelectField(props) {
  const{label,name, width,control} = props



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
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={onChange}
                    value = {value}
                    >
                    <MenuItem value="">
                        <em></em>
                    </MenuItem>
                    <MenuItem value={'O1'}>O1</MenuItem>
                    <MenuItem value={'O2'}>O2</MenuItem>
                    <MenuItem value={'FE'}>Fe</MenuItem>
                    <MenuItem value={'FP'}>FP</MenuItem>
                    <MenuItem value={'MS'}>MS</MenuItem>
                    <MenuItem value={'PH'}>PH</MenuItem>
                    <MenuItem value={'N/A'}>NA</MenuItem>

                </Select>
            )
            }
            />

        
      </FormControl>

  

  );
}