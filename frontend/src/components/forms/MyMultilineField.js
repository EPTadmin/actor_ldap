import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'



export default function MyMultilineField(props) {
    const{label,placeholder,width,name, control} = props
  return (

      <Controller
      name = {name}
      control = {control}
      render={({
        field : {onChange,value},
        fieldState : {error},
        formState,

      }) => (


          <TextField
          sx={{width:{width}}}
          id="standard-multiline-static"
          label={label}
          onChange={onChange}
          value = {value}
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="standard"
          placeholder={placeholder}  
        />
      )
    }
    />
  );
}


