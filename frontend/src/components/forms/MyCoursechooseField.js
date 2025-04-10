import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Controller} from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText';

export default function MyCoursechooseField(props) {
    const{label,name, width,control,options} = props
    options.sort(function(a, b) {
        var textA = a.course_id.toLowerCase();
        var textB = b.course_id.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

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
                    {
                        options.map((option)=>(
                            <MenuItem value={option.id}>{option.course_id } {option.name}
                            <em></em>
                        </MenuItem>
                        ))
                    }

                    {/* <MenuItem value={'s'}>s</MenuItem>
                    <MenuItem value={'i'}>i</MenuItem>
                    <MenuItem value={'t'}>t</MenuItem>
                    <MenuItem value={'p'}>p</MenuItem>
                    <MenuItem value={'off'}>off</MenuItem> */}

                    
                </Select>
                <FormHelperText sx={{color:"#d32f2f"}}>{error?.message} </FormHelperText>
                </FormControl>


            )
            }
            />

        

  

  );
}