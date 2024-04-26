import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'

export default function MyPositionFieldMulti(props) {
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
                    value = {[value]}
                    
                    >
                    <MenuItem value="">
                        <em></em>
                    </MenuItem>
                    <MenuItem value={'P1'}>P1</MenuItem>
                    <MenuItem value={'F1'}>F1</MenuItem>
                    <MenuItem value={'UL'}>UL</MenuItem>
                    <MenuItem value={'P2'}>P2</MenuItem>
                    <MenuItem value={'F2'}>F2</MenuItem>
                    <MenuItem value={'L'}>L</MenuItem>
                    <MenuItem value={'Ext'}>Ext</MenuItem>
                </Select>
            )
            }
            />

        
      </FormControl>

  

  );
}