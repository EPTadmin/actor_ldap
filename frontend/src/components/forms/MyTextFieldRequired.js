import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'

export default function MyTextFieldRequired(props) {
    const{label,width,placeholder,name, control} = props
  return (

      <Controller
      name = {name}
      control = {control}
      render={({
        field : {onChange,value},
        fieldState : { error },
        formState,

      }) => (
      <TextField
          required
          sx={{width:{width}}}
          onChange={onChange}
          value = {value}
          id="standard-required"
          label={label}
          variant="standard"
          placeholder={placeholder}  
          error = {!!error}
          helperText = {error?.message}        
          />
      )
    }
    />
  );
}